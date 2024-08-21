import pytest
from django.urls import reverse
from django.test import Client
from authentication.models import User


@pytest.mark.django_db
@pytest.mark.parametrize(
    "route",
    [
        "feed",
        "photos",
        "photos_add",
        "photos_add_multiple",
        "posts",
        "posts_add",
        "follow_user",
    ],
)
def test_no_args_routes_without_authentication(route):
    client = Client()
    url = reverse(route)
    response = client.get(url, follow=True)
    assert response.status_code == 200


@pytest.mark.django_db
@pytest.mark.parametrize(
    "route, kwargs",
    [
        ("photos_detail", {"id": 1}),
        ("photos_update", {"id": 1}),
        ("photos_delete", {"id": 1}),
        ("posts_detail", {"id": 1}),
        ("posts_update", {"id": 1}),
        ("posts_delete", {"id": 1}),
    ],
)
def test_args_routes_without_authentication(route, kwargs):
    client = Client()
    url = reverse(route, kwargs=kwargs)
    response = client.get(url, follow=True)
    assert response.status_code == 200
    assert b"SE CONNECTER" in response.content


@pytest.mark.django_db
@pytest.mark.parametrize(
    "route, kwargs",
    [
        ("photos", {"expected_content": "PHOTOS"}),
        ("photos_add", {"expected_content": "AJOUTER UNE PHOTO"}),
        ("posts", {"expected_content": "BILLETS"}),
        ("posts_add", {"expected_content": "AJOUTER UN BILLET"}),
    ],
)
def test_args_routes_with_authentication(authenticate_user, route, kwargs):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse(route)
    response = client.get(url, follow=True)
    assert response.status_code == 200
    assert kwargs["expected_content"] in response.content.decode("utf-8")


@pytest.mark.django_db
def test_contact_admin_post_with_invalid_form(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("contact_admin")
    response = client.post(url)
    templates = [template.name for template in response.templates]
    assert "blog/contact_admin.html" in templates
    assert response.status_code == 200
    assert (
        "Mail n&#x27;a pas pu être envoyé, merci d&#x27;essayer de nouveau"
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
    assert "Mail envoyé vous aurez vite un retour" in response.content.decode("utf-8")


@pytest.mark.django_db
def test_home():
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("home")
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert "blog/home.html" in templates


@pytest.mark.django_db
def test_follow_user(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("follow_user")
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert "blog/follow_user.html" in templates


@pytest.mark.django_db
def test_follow_user_with_invalid_form(authenticate_user):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("follow_user")
    response = client.post(url)
    templates = [template.name for template in response.templates]
    assert "blog/follow_user.html" in templates
    assert (
        "Abonnement n&#x27;a pas pu être réalisé, merci d&#x27;essayer de nouveau"
        in response.content.decode("utf-8")
    )


@pytest.mark.django_db
def test_follow_user_with_valid_form(authenticate_user, mocker):
    follow_id = User.objects.get(username="donald").id
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")
    url = reverse("follow_user")
    form_data = {
        "follows": [follow_id],
    }
    response = client.post(url, data=form_data, follow=True)
    templates = [template.name for template in response.templates]
    assert "blog/feed.html" in templates
    assert "Abonnement mis à jour" in response.content.decode("utf-8")
