"""the authentication app tests"""

import os
import pytest
from django.urls import reverse
from django.test import Client
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
        "role": "CREATOR",
    }
    response = client.post(url, follow=True, data=form_data)
    assert response.status_code == 200
    assert "Vous êtes maintenant inscrit" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_post_signin_with_invalid_credentials():
    client = Client()
    url = reverse("signin")
    form_data = {"username": "loulou", "password": "loulouPassword"}
    response = client.post(url, data=form_data, follow=True)
    assert response.status_code == 200
    assert (
        "Inscription non réalisée, merci d&#x27;essayer de nouveau"
        in response.content.decode("utf-8")
    )


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
    client.login(username="pytest_user", password="p@ssword123")
    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, "dummy_image.jpg")
    with open(image_path, "rb") as img_file:
        image = SimpleUploadedFile(
            image_path, img_file.read(), content_type="image/jpeg"
        )

    form_data = {
        "image_profile": image,
    }

    headers = {"Content-type": "multipart/form-data"}
    url = reverse("update_profile_image")
    response = client.post(url, follow=True, data=form_data, **headers)
    assert response.status_code == 200
    assert "Captcha invalide," in response.content.decode("utf-8")


# Added 2026-09-30 to complete blog/views.py branch coverage.
# Existing tests were reviewed first; these tests target previously uncovered
# branches without duplicating the existing happy paths.


@pytest.mark.django_db
def test_get_contact_admin(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")

    response = client.get(reverse("contact_admin"))

    assert response.status_code == 200
    assert "authentication/contact_admin.html" in [template.name for template in response.templates]


@pytest.mark.django_db
def test_post_signin_with_invalid_credentials_shows_form_errors():
    client = Client()
    url = reverse("signin")

    response = client.post(
        url,
        data={
            "username": "loulou",
            "first_name": "loulou",
            "last_name": "duck",
            "email": "not-an-email",
            "password1": "password1",
            "password2": "different-password",
            "role": "INVALID",
        },
    )

    assert response.status_code == 200
    assert response.context["form"].errors


@pytest.mark.django_db
def test_post_update_profile_image_with_invalid_form(authenticate_user, monkeypatch):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")

    class InvalidForm:
        def __init__(self, *args, **kwargs):
            pass

        def is_valid(self):
            return False

        @property
        def errors(self):
            return {}

    monkeypatch.setattr(
        "authentication.views.forms.ProfileImageUpdateForm",
        InvalidForm,
    )

    response = client.post(
        reverse("update_profile_image"),
        data={"image_profile": "invalid"},
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_get_update_profile_image_with_authentication(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")

    response = client.get(reverse("update_profile_image"))

    assert response.status_code == 200


@pytest.mark.django_db
def test_contact_admin_post_with_invalid_form(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("contact_admin")
    response = client.post(url)
    templates = [template.name for template in response.templates]
    assert "authentication/contact_admin.html" in templates
    assert response.status_code == 200
    assert (
        "Mail n&#x27;a pas pu etre envoye"
        in response.content.decode("utf-8")
    )


@pytest.mark.django_db
def test_contact_admin_post_with_valid_form(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("contact_admin")
    form_data = {
        "username": "pytest_user",
        "email": "pytest_user@localhost",
        "message": "This is a test message.",
    }
    response = client.post(url, data=form_data, follow=True)
    templates = [template.name for template in response.templates]
    assert "blog/feed.html" in templates
    assert response.status_code == 200
    assert "Un email de confirmation vous a ete envoye" in response.content.decode("utf-8")