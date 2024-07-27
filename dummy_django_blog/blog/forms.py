from django import forms
from django.contrib.auth import get_user_model

from . import models


class ContactForm(forms.Form):
    username = forms.CharField(label="Nom d'utilisateur", max_length=125)
    email = forms.EmailField(label="Email utilisateur")
    message = forms.CharField(label="Votre message", max_length=1500, widget=forms.TextInput)


class PhotoForm(forms.ModelForm):
    edit_photo = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = models.Photo
        fields = ["title_photo", "caption", "image"]


class PhotoDeleteForm(forms.Form):
    delete_photo = forms.BooleanField(widget=forms.HiddenInput, initial=True)


class PostForm(forms.ModelForm):
    edit_post = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = models.Post
        fields = ["title", "content"]


class PostDeleteForm(forms.Form):
    delete_post = forms.BooleanField(widget=forms.HiddenInput, initial=True)


class FollowForm(forms.ModelForm):

    class Meta:
        model = get_user_model()
        fields = ["follows"]
