from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


class SigninForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = ["username", "email"]


class ProfileImageUpdateForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = [
            "image_profile",
        ]


class ContactForm(forms.Form):
    username = forms.CharField(label="Nom d'utilisateur", max_length=125)
    email = forms.EmailField(label="Email utilisateur")
    message = forms.CharField(
        label="Votre message", max_length=1200, widget=forms.TextInput
    )