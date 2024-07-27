import os
import pytest
from django.urls import reverse
from django.test import Client
from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.mark.django_db
def test_get_posts_detail_with_missing_post(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_detail", kwargs={"id": 55555})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /posts/55555/detail/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_detail_with_mocked_post(authenticate_user, mocker):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_detail", kwargs={"id": 1})
    mock_post = mocker.Mock()
    mock_post.id = 1
    mock_post.title = "test post title"
    mock_post.content = "test post content"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/posts_detail.html' in templates
    assert "BILLET" in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_delete_with_mocked_post(authenticate_user, mocker):
    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test post title"
    mock_post.content = "test post content"
    mock_post.contributors = ["pytest_user"]
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    url = reverse("posts_delete", args=[1])
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    response = client.get(url)
    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert 'blog/posts_delete.html' in templates


@pytest.mark.django_db
def test_post_posts_delete_with_mocked_post(authenticate_user, mocker):
    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test post title"
    mock_post.content = "test post content"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    mock_delete = mocker.patch('blog.models.Post.delete')
    url = reverse("posts_delete", args=[1])
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    response = client.post(url, follow=True)
    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert 'blog/feed.html' in templates
    assert "FLUX TOPBLOG" in response.content.decode('utf-8')
    assert "Aucunes publications pour le moment" in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_delete_with_missing_post(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_delete", kwargs={"id": 55555})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /posts/55555/delete/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_add_with_missing_photo(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_add")
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/posts_add.html' in templates


@pytest.mark.django_db
def test_post_posts_add_with_real_image(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')

    # Define the URL for adding a photo
    url = reverse('posts_add')

    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, "dummy_image.jpg")
    with open(image_path, "rb") as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type="image/jpeg")

    form_data = {
        "title": "Test B@llet",
        "content": "Billet de test",
        "edit_post": True,
        "title_photo": "Test Photo",
        "caption": "Photo de test",
        "image": image,
        "edit_photo": True
    }

    headers = {
        "Content-type": "multipart/form-data"
    }
    response = client.post(url, follow=True, data=form_data, **headers)

    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert 'blog/feed.html' in templates
    assert 'Billet ajouté' in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_update_with_missing_post(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_update", kwargs={"id": 55555})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /posts/55555/update/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_posts_update_with_mocked_post(authenticate_user, mocker):
    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test title"
    mock_post.content = "test content"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_update", kwargs={"id": 1})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/posts_update.html' in templates


@pytest.mark.django_db
def test_post_posts_update_with_invalid_form(authenticate_user, mocker):
    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test title"
    mock_post.content = "test content"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_update", kwargs={"id": 1})
    form_data = {"id": 1, "edit_post": True}
    response = client.post(url, data=form_data)
    templates = [template.name for template in response.templates]
    assert 'blog/posts_update.html' in templates
    assert "Le billet n&#x27;a pas pu être publié, merci d&#x27;essayer de nouveau" in response.content.decode('utf-8')


@pytest.mark.django_db
def test_post_posts_update_with_mocked_post_option_delete(authenticate_user, mocker):
    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test title"
    mock_post.content = "test content"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_update", kwargs={"id": 1})
    form_data = {"id": 1, "delete_post": True}
    response = client.post(url, data=form_data, follow=True)
    templates = [template.name for template in response.templates]
    assert 'blog/posts_delete.html' in templates


@pytest.mark.django_db
def test_post_posts_update_with_valid_form(authenticate_user, mocker):
    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, "dummy_image.jpg")
    with open(image_path, "rb") as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type="image/jpeg")

    mock_post = mocker.MagicMock()
    mock_post.id = 1
    mock_post.title = "test t@tle"
    mock_post.content = "test content"

    mocker.patch('blog.views.get_object_or_404', return_value=mock_post)

    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("posts_update", kwargs={"id": 1})
    form_data = {
        "id": 1,
        "title": "test t@tle",
        "content": "test content",
        "edit_post": True,
        "title_photo": "Strangers in the dark",
        "caption": "Crédits France Radios",
        "image": image,
        "edit_photo": True,
    }
    response = client.post(url, data=form_data, follow=True)
    templates = [template.name for template in response.templates]
    assert 'blog/feed.html' in templates
    assert "Billet mis à jour" in response.content.decode('utf-8')
