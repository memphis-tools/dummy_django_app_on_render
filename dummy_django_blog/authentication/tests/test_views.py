"""the authentication app tests"""
import os
import pytest
from django.conf import settings
from django.urls import reverse
from django.test import Client
from authentication.models import User
from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.mark.django_db
def test_get_signin():
    client = Client()
    url = reverse("signin")
    response = client.get(url, follow=True)
    assert response.status_code == 200
    assert "INSCRIPTION" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_post_signin_with_valid_credentials():
    client = Client()
    url = reverse("signin")
    form_data = {
        "username": "loulou",
        "first_name": "loulou",
        "last_name": "duck",
        "email": "loulou.duck@blue-lake.fr",
        "password1": "bigP@ssword9",
        "password2": "bigP@ssword9",
        "role": "CREATOR"
    }
    response = client.post(url, follow=True, data=form_data)
    assert response.status_code == 200
    assert "Vous êtes maintenant inscrit" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_post_signin_with_invalid_credentials():
    client = Client()
    url = reverse("signin")
    form_data = {
        "username": "loulou",
        "password": "loulouPassword"
    }
    response = client.post(url, data=form_data, follow=True)
    assert response.status_code == 200
    assert "Inscription non réalisée, merci d&#x27;essayer de nouveau" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_get_update_profile_image_without_authentication():
    client = Client()
    url = reverse("update_profile_image")
    response = client.get(url, follow=True)
    assert response.status_code == 200
    assert "CONNEXION" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_post_update_profile_image_with_authentication(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, "dummy_image.jpg")
    with open(image_path, "rb") as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type="image/jpeg")

    form_data = {
        "image_profile": image,
    }

    headers = {
        "Content-type": "multipart/form-data"
    }
    url = reverse("update_profile_image")
    response = client.post(url, follow=True, data=form_data, **headers)
    assert response.status_code == 200
    assert "Image de profile mise à jour" in response.content.decode("utf-8")

    media_path = settings.MEDIA_ROOT
    for root, dirs, files in os.walk(media_path):
        for file in files:
            if file.startswith("dummy_image"):
                os.remove(os.path.join(root, file))
            elif file.startswith("billet_"):
                os.remove(os.path.join(root, file))
            elif file.startswith("photo_"):
                os.remove(os.path.join(root, file))
            elif file.startswith("dummy_image"):
                os.remove(os.path.join(root, file))
