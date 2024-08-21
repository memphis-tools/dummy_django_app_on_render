from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from . import forms


def signin(request):
    form = forms.SigninForm()
    if request.method == "POST":
        form = forms.SigninForm(request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.INFO, "Vous êtes maintenant inscrit(e)")
            return redirect("home")
        else:
            messages.add_message(
                request, messages.ERROR, "Inscription non réalisée, merci d'essayer de nouveau"
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
            form.save()
            messages.add_message(request, messages.INFO, "Image de profile mise à jour")
            return redirect("feed")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                f"Image n'a pas pas pu etre mise à jour, merci de vérifier d'essayer de nouveau",
            )
    return render(
        request, "authentication/update_profile_image.html", context={"form": form}
    )
