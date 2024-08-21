"""The dummy blog routes"""

import os
from itertools import chain
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, permission_required
from django.core.mail import send_mail
from django.contrib import messages
from django.forms import formset_factory
from django.core.paginator import Paginator
from django.conf import settings

from . import forms
from . import models


def contact_admin(request):
    """A dummy contact_admin route"""
    form = forms.ContactForm()
    if request.method == "POST":
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            send_mail(
                subject=f"Email from {form.cleaned_data['username']}",
                from_email=form.cleaned_data["email"],
                message=form.cleaned_data["message"],
                recipient_list=["sanjuro@localhost"],
                fail_silently=False,
            )
            messages.add_message(
                request, messages.INFO, "Mail envoyé vous aurez vite un retour"
            )
            return redirect("feed")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Mail n'a pas pu être envoyé, merci d'essayer de nouveau",
            )
    return render(request, "blog/contact_admin.html", context={"form": form})


def home(request):
    """A dummy home route"""
    return render(request, "blog/home.html", context={})


@login_required
@permission_required("blog.view_photo", raise_exception=True)
@permission_required("blog.view_post", raise_exception=True)
def feed(request):
    """A dummy feed route"""
    posts = models.Post.objects.filter(
        Q(contributors__in=request.user.follows.all()) | Q(starred=True)
    )
    photos = models.Photo.objects.filter(
        Q(uploader__in=request.user.follows.all())
    ).exclude(post__in=posts)
    photos_and_posts = sorted(
        chain(photos, posts), key=lambda instance: instance.created_at, reverse=True
    )
    paginator = Paginator(photos_and_posts, 5)
    page = request.GET.get("page")
    page_obj = paginator.get_page(page)
    return render(
        request,
        "blog/feed.html",
        context={
            "page_obj": page_obj,
            "MEDIA_URL": settings.MEDIA_URL,
        },
    )


@login_required
@permission_required("blog.view_photo", raise_exception=True)
def photos_view(request):
    """A dummy photos_view route"""
    photos = models.Photo.objects.filter(
        uploader__in=request.user.follows.all()
    ).order_by("-created_at")
    paginator = Paginator(photos, 5)
    page = request.GET.get("page")
    page_obj = paginator.get_page(page)
    return render(request, "blog/photos_view.html", context={"page_obj": page_obj})


@login_required
@permission_required("blog.view_photo", raise_exception=True)
def photos_detail(request, id):
    """A dummy photos_detail route"""
    photo = get_object_or_404(models.Photo, id=id)
    return render(request, "blog/photos_detail.html", context={"photo": photo})


@login_required
@permission_required("blog.delete_photo", raise_exception=True)
def photos_delete(request, id):
    """A dummy photos_delete route"""
    photo = get_object_or_404(models.Photo, id=id)
    form = forms.PhotoDeleteForm()
    if request.method == "POST":
        if str(photo.uploader) == str(request.user) or request.user.is_staff:
            os.remove(f"media/{photo.image.name}")
            photo.delete()
            messages.add_message(request, messages.INFO, "Photo supprimée")
            return redirect("feed")
    return render(request, "blog/photos_delete.html", context={"photo": photo})


@login_required
@permission_required("blog.change_photo", raise_exception=True)
def photos_update(request, id):
    """A dummy photos_update route"""
    photo = get_object_or_404(models.Photo, id=id)
    edit_form = forms.PhotoForm(instance=photo)
    delete_form = forms.PhotoDeleteForm()
    if request.method == "POST":
        if str(photo.uploader) == str(request.user) or request.user.is_staff:
            if "edit_photo" in request.POST:
                form = forms.PhotoForm(request.POST, request.FILES, instance=photo)
                if form.is_valid():
                    form.save()
                    messages.add_message(request, messages.INFO, "Photo mise à jour")
                    return redirect("feed")
                else:
                    messages.add_message(
                        request,
                        messages.ERROR,
                        f"La photo n'a pas pu être publiée, merci d'essayer de nouveau: {form.errors}",
                    )
            elif "delete_photo" in request.POST:
                form = forms.PhotoDeleteForm(request.POST)
                if form.is_valid():
                    return redirect("photos_delete", id=photo.id)
    return render(
        request,
        "blog/photos_update.html",
        context={"photo": photo, "edit_form": edit_form, "delete_form": delete_form},
    )


@login_required
@permission_required("blog.view_post", raise_exception=True)
def posts_view(request):
    """A dummy posts_view route"""
    posts = models.Post.objects.all().order_by("-created_at")
    paginator = Paginator(posts, 5)
    page = request.GET.get("page")
    page_obj = paginator.get_page(page)
    return render(request, "blog/posts_view.html", context={"page_obj": page_obj})


@login_required
@permission_required("blog.view_post", raise_exception=True)
def posts_detail(request, id):
    """A dummy posts_detail route"""
    post = get_object_or_404(models.Post, id=id)
    return render(request, "blog/posts_detail.html", context={"post": post})


@login_required
@permission_required("blog.delete_post", raise_exception=True)
def posts_delete(request, id):
    """A dummy posts_delete route"""
    post = get_object_or_404(models.Post, id=id)
    if request.method == "POST":
        if (
            post.contributors.filter(id=request.user.id).exists() or request.user.is_staff
        ):
            post.delete()
            messages.add_message(request, messages.INFO, "Billet supprimé")
            return redirect("feed")
    return render(request, "blog/posts_delete.html", context={"post": post})


@login_required
@permission_required("blog.add_photo", raise_exception=True)
def photos_add(request):
    """A dummy photos_add route"""
    form = forms.PhotoForm()
    if request.method == "POST":
        form = forms.PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.uploader = request.user
            photo.save()
            messages.add_message(request, messages.INFO, "Photo ajoutée")
            return redirect("feed")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "La photo n'a pas pu être ajoutée, merci d'essayer de nouveau",
            )
    return render(request, "blog/photos_add.html", context={"form": form})


@login_required
@permission_required("blog.add_multiple_photos", raise_exception=True)
def photos_add_multiple(request):
    """A dummy photos_add_multiple route"""
    Formset = formset_factory(forms.PhotoForm, extra=5)
    formset = Formset()
    if request.method == "POST":
        formset = Formset(request.POST, request.FILES)
        if formset.is_valid():
            for form in formset:
                if form.cleaned_data:
                    photo = form.save(commit=False)
                    photo.uploader = request.user
                    photo.save()
                else:
                    messages.add_message(
                        request,
                        messages.ERROR,
                        f"La photo {form.cleaned_data['title']} n'a pas pu être ajoutée, merci d'essayer de nouveau",
                    )
            messages.add_message(request, messages.INFO, "Photos ajoutées")
            return redirect("feed")
    return render(
        request, "blog/photos_add_multiple.html", context={"formset": formset}
    )


@login_required
@permission_required("blog.add_photo", raise_exception=True)
@permission_required("blog.add_post", raise_exception=True)
def post_and_photo_add(request):
    """A dummy post_and_photo_add route"""
    post_form = forms.PostForm()
    photo_form = forms.PhotoForm()
    context = {"photo_form": photo_form, "post_form": post_form}
    if request.method == "POST":
        post_form = forms.PostForm(request.POST)
        photo_form = forms.PhotoForm(request.POST, request.FILES)
        if all([post_form.is_valid(), photo_form.is_valid()]):
            photo = photo_form.save(commit=False)
            photo.uploader = request.user
            photo.save()
            post = post_form.save(commit=False)
            post.image = photo
            post.save()
            # Create the Contributor instance explicitly
            models.Contributor.objects.create(
                contributor=request.user, post=post, contribution="Auteur principal"
            )
            messages.add_message(request, messages.INFO, "Billet ajouté")
            return redirect("feed")
        else:
            for error in post_form.errors:
                messages.add_message(
                    request,
                    messages.ERROR,
                    f"Le billet n'a pas pu être ajouté, merci d'essayer de nouveau: {list(post_form.errors.values())}",
                )
    return render(request, "blog/posts_add.html", context=context)


@login_required
@permission_required("blog.change_post", raise_exception=True)
def posts_update(request, id):
    """A dummy posts_update route"""
    post = get_object_or_404(models.Post, id=id)
    update_on_null_image = False
    try:
        photo = get_object_or_404(models.Photo, id=post.image.id)
        edit_photo_form = forms.PhotoForm(instance=photo)
    except AttributeError:
        edit_photo_form = forms.PhotoForm()
        update_on_null_image = True
    edit_post_form = forms.PostForm(instance=post)
    delete_form = forms.PostDeleteForm()
    if request.method == "POST":
        if (
            post.contributors.filter(id=request.user.id).exists() or request.user.is_staff
        ):
            if "edit_post" in request.POST:
                post_form = forms.PostForm(request.POST, instance=post)
                if not update_on_null_image:
                    photo_form = forms.PhotoForm(
                        request.POST, request.FILES, instance=photo
                    )
                else:
                    photo_form = forms.PhotoForm(request.POST, request.FILES)
                if all([post_form.is_valid(), photo_form.is_valid()]):
                    photo = photo_form.save(commit=False)
                    photo.uploader = request.user
                    photo.save()
                    post = post_form.save(commit=False)
                    post.image = photo
                    post.save()
                    messages.add_message(request, messages.INFO, "Billet mis à jour")
                    return redirect("feed")
                else:
                    messages.add_message(
                        request,
                        messages.ERROR,
                        f"Le billet n'a pas pu être publié, merci d'essayer de nouveau: {post_form.errors} - {photo_form.errors}",
                    )
            elif "delete_post" in request.POST:
                form = forms.PostDeleteForm(request.POST)
                if form.is_valid():
                    return redirect("posts_delete", id=post.id)
    return render(
        request,
        "blog/posts_update.html",
        context={
            "post": post,
            "edit_post_form": edit_post_form,
            "edit_photo_form": edit_photo_form,
            "delete_form": delete_form,
        },
    )


@login_required
def follow_user(request):
    """A dummy follow_user route"""
    form = forms.FollowForm(instance=request.user)
    if request.method == "POST":
        form = forms.FollowForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.INFO, "Abonnement mis à jour")
            return redirect("feed")
        else:
            messages.add_message(
                request,
                messages.ERROR,
                "Abonnement n'a pas pu être réalisé, merci d'essayer de nouveau",
            )
    return render(request, "blog/follow_user.html", context={"form": form})
