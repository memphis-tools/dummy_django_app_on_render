import os
import json
import requests
from django.shortcuts import render, redirect
from django.urls import reverse
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail, EmailMessage
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired, dumps, loads

from . import forms
from . import sendgrid
from . import log_events


def hcaptcha_valid(request) -> bool:
    hcaptcha_response = request.POST.get("h-captcha-response")
    if not hcaptcha_response:
        messages.error(request, "Captcha invalide, merci d'essayer de nouveau")
        return False                      # ← était manquant
    try:
        response = requests.post(
            settings.HCAPTCHA_VERIFY_URL,
            data={"secret": settings.HCAPTCHA_SITE_SECRET, "response": hcaptcha_response},
            timeout=10,
        )
        is_success = response.json().get("success")
    except requests.RequestException:
        is_success = False
    if not is_success:
        messages.error(request, "Captcha invalide, merci d'essayer de nouveau")
        return False
    return True


def signin(request):
    form = forms.SigninForm()
    if request.method == "POST":
        form = forms.SigninForm(request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(
                request, messages.INFO, "Vous êtes maintenant inscrit(e)"
            )
            return redirect("home")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Inscription non réalisée, merci d'essayer de nouveau",
            )
    return render(request, "authentication/signin.html", context={"form": form})


@login_required
def update_profile_image(request):
    form = forms.ProfileImageUpdateForm(instance=request.user)
    if request.method == "POST":
        form = forms.ProfileImageUpdateForm(
            request.POST, request.FILES, instance=request.user
        )
        if form.is_valid():
            if hcaptcha_valid(request):
                form.save()
                messages.add_message(request, messages.INFO, "Image de profile mise à jour")
                return redirect("feed")
            else:
                messages.add_message(
                    request,
                    messages.ERROR,
                    "Captcha invalide, merci d'essayer de nouveau",
                )
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Image n'a pas pas pu etre mise à jour, merci de vérifier le format (.jpg) et d'essayer de nouveau",
            )
    return render(
        request, "authentication/update_profile_image.html", context={"form": form}
    )


# lien valide 30 minutes
CONFIRMATION_TIMEOUT = 30 * 60

def contact_admin(request):
    """Contact form with a signed double opt-in confirmation link"""
    # blog/views.py — dans contact_admin, tout en haut de la vue
    import logging
    logging.getLogger("debug_env").error(
        "ENV CHECK host=%s port=%s user=%s tls=%s site_url=%s",
        os.getenv("EMAIL_HOST"),
        os.getenv("EMAIL_PORT"),
        os.getenv("EMAIL_HOST_USER"),
        os.getenv("EMAIL_USE_TLS"),
        settings.SITE_URL,
    )
    form = forms.ContactForm()
    if request.method == "POST":
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            email = form.cleaned_data["email"]
            contact_message = form.cleaned_data["message"]

            # Le message n'est PAS encore envoyé : il est signé dans un token
            # et le visiteur doit confirmer via le lien reçu dans sa boîte.
            payload = json.dumps(
                {"username": username, "email": email, "message": contact_message}
            )
            token = dumps(
                {"username": username, "email": email, "message": contact_message},
                salt="contact_admin",  # optionnel mais propre
            )
            
            confirm_url = f"{settings.SITE_URL}{reverse('contact_admin_confirm', args=[token])}"
            confirmation_body = (
                f"Bonjour {username},\n\n"
                f"Pour transmettre votre message a l'administrateur, "
                f"merci de confirmer votre demande en cliquant sur ce lien "
                f"(valide {CONFIRMATION_TIMEOUT // 60} minutes) :\n\n"
                f"{confirm_url}\n\n"
                f"Si vous n'etes pas a l'origine de cette demande, "
                f"ignorez simplement cet email."
            )
            if os.getenv("RUNNING_ENV") == "cloud":
                sendgrid.send_via_sendgrid(email, "Confirmez votre message", confirmation_body)
            else:
                send_mail(
                    subject="Confirmez votre message",
                    message=confirmation_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    fail_silently=False,
                )
            messages.add_message(
                request,
                messages.INFO,
                "Un email de confirmation vous a ete envoye : "
                "cliquez sur le lien pour transmettre votre message.",
            )
            logs_context = {
                "contact_user": username,
                "contact_email": email,
                "contact_message": contact_message,
            }
            log_events.log_event("INFO - Envoi d'un lien de confirmation pour contact.", logs_context)
            return redirect("feed")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Mail n'a pas pu etre envoye, merci d'essayer de nouveau",
            )
    return render(request, "authentication/contact_admin.html", context={"form": form})


def contact_admin_confirm(request, token):
    """Confirm the signed token then forward the message to the admin"""
    try:
        data = loads(token, max_age=CONFIRMATION_TIMEOUT, salt="contact_admin")
    except SignatureExpired:
        messages.add_message(
            request,
            messages.ERROR,
            "Le lien de confirmation a expire, merci de remplir a nouveau "
            "le formulaire.",
        )
        log_events.log_event(
            "INFO - Lien de confirmation expire pour contact.",
            {"token_prefix": token[:20]},   # data n'existe pas : on logge autre chose
        )
        return redirect("contact_admin")
    except (BadSignature, json.JSONDecodeError):
        messages.add_message(
            request,
            messages.ERROR,
            "Lien de confirmation invalide.",
        )
        log_events.log_event(
            "INFO - Lien de confirmation invalide pour contact.",
            {"token_prefix": token[:20]},
        )
        return redirect("contact_admin")

    contact_subject = (
        f"[Contact confirme] Message de "
        f"{data['username']} <{data['email']}>"
    )
    if os.getenv("RUNNING_ENV") == "cloud":
        sendgrid.send_via_sendgrid(settings.DEFAULT_TO_EMAIL, contact_subject, data["message"], reply_to=data["email"])
    else:
        # L'adresse email du visiteur est désormais prouvée : envoi réel.
        EmailMessage(
            subject=contact_subject,
            body=data["message"],
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.DEFAULT_TO_EMAIL],
            reply_to=[data["email"]],
        ).send(fail_silently=False)

    logs_context = {
        "current_user": f"{data['username']}",
        "email": f"{data['email']}",
        "contact_message": f"{data['message']}",
    }
    log_events.log_event("INFO - Transmission d'un message de contact.", logs_context)

    messages.add_message(
        request,
        messages.SUCCESS,
        "Votre message a bien ete transmis. Merci !",
    )
    return redirect("feed")
