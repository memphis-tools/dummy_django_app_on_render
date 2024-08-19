"""the blog app tests"""
import os
import re
import pytest
from datetime import datetime
from django.urls import reverse
from django.test import Client
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils.datastructures import MultiValueDict
from blog.models import Photo


@pytest.mark.django_db
def test_get_photos_detail_with_missing_photo(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_detail", kwargs={"id": 55555})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /photos/55555/detail/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_photos_detail_with_mocked_photo(authenticate_user, mocker):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_detail", kwargs={"id": 1})
    mock_photo = mocker.Mock()
    mock_photo.id = 1
    mock_photo.title = "test photo"
    mock_photo.created_at = datetime.now()
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_detail.html' in templates
    assert "PHOTO" in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_photos_delete_with_missing_photo(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_delete", kwargs={"id": 1})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /photos/1/delete/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_photos_delete_with_missing_photo(authenticate_user, mocker):
    mock_photo = mocker.MagicMock()
    mock_photo.image.name = "test_image.jpg"
    mock_photo.uploader = "pytest_user"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_delete", kwargs={"id": 1})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_delete.html' in templates


@pytest.mark.django_db
def test_get_photos_add_with_missing_photo(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_add")
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_add.html' in templates


@pytest.mark.django_db
def test_get_photos_update_with_missing_photo(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_update", kwargs={"id": 55555})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'error.html' in templates
    assert "Page /photos/55555/update/ n'existe pas." in response.content.decode('utf-8')


@pytest.mark.django_db
def test_get_photos_update_with_mocked_photo(authenticate_user, mocker):
    mock_photo = mocker.MagicMock()
    mock_photo.id = 1
    mock_photo.image.name = "test_image.jpg"
    mock_photo.uploader = "pytest_user"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_update", kwargs={"id": 1})
    response = client.get(url)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_update.html' in templates


@pytest.mark.django_db
def test_post_photos_update_with_invalid_form(authenticate_user, mocker):
    mock_photo = mocker.MagicMock()
    mock_photo.id = 1
    mock_photo.image.name = "test_image.jpg"
    mock_photo.uploader = "pytest_user"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_update", kwargs={"id": 1})
    form_data = {"id": 1, "edit_photo": True}
    response = client.post(url, data=form_data)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_update.html' in templates
    assert "La photo n&#x27;a pas pu être publiée, merci d&#x27;essayer de nouveau" in response.content.decode('utf-8')


@pytest.mark.django_db
def test_post_photos_update_with_mocked_photo_option_delete(authenticate_user, mocker):
    mock_photo = mocker.MagicMock()
    mock_photo.id = 1
    mock_photo.image.name = "test_image.jpg"
    mock_photo.uploader = "pytest_user"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_update", kwargs={"id": 1})
    form_data = {"id": 1, "delete_photo": True}
    response = client.post(url, data=form_data, follow=True)
    templates = [template.name for template in response.templates]
    assert 'blog/photos_delete.html' in templates


@pytest.mark.django_db
def test_post_photos_add_with_real_image(authenticate_user, mocker):
    client = Client()
    client.login(username="pytest_user", password="p@ssword123")

    # Define the URL for adding a photo
    url = reverse("photos_add")

    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, "dummy_image.jpg")
    with open(image_path, "rb") as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type="image/jpeg")

    form_data = {
        "title_photo": "Test Photo",
        "caption": "This is a test photo",
        "image": image,
        "edit_photo": True
    }

    headers = {
        "Content-type": "multipart/form-data"
    }
    response = client.post(url, follow=True, data=form_data, **headers)

    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert "blog/feed.html" in templates
    assert "Photo ajoutée" in response.content.decode("utf-8")

    # Verify that the photo was added to the database
    from blog.models import Photo
    assert Photo.objects.filter(title_photo="Test Photo", caption="This is a test photo").exists()


@pytest.mark.django_db
def test_post_photos_add_multiple_with_real_image(authenticate_user, mocker):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')

    # Define the URL for adding a photo
    url = reverse("photos_add_multiple")

    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, 'dummy_image.jpg')
    with open(image_path, 'rb') as img_file:
        image_content = img_file.read()

    # Create multiple image files for each form
    image_files = [
        SimpleUploadedFile('dummy_image.jpg', image_content, content_type='image/jpeg') for _ in range(5)
    ]

    form_data = {
        'form-TOTAL_FORMS': '5',
        'form-INITIAL_FORMS': '0',
        'form-MIN_NUM_FORMS': '0',
        'form-MAX_NUM_FORMS': '5',
        'form-0-title_photo': 'Test Photo 1',
        'form-0-caption': 'This is a test photo',
        'form-0-edit_photo': True,
        'form-1-title_photo': 'Test Photo 2',
        'form-1-caption': 'This is a test photo',
        'form-1-edit_photo': True,
        'form-2-title_photo': 'Test Photo 3',
        'form-2-caption': 'This is a test photo',
        'form-2-edit_photo': True,
        'form-3-title_photo': 'Test Photo 4',
        'form-3-caption': 'This is a test photo',
        'form-3-edit_photo': True,
        'form-4-title_photo': 'Test Photo 5',
        'form-4-caption': 'This is a test photo',
        'form-4-edit_photo': True,
    }

    # Create MultiValueDict for files
    file_data = MultiValueDict({
        'form-0-image': [image_files[0]],
        'form-1-image': [image_files[1]],
        'form-2-image': [image_files[2]],
        'form-3-image': [image_files[3]],
        'form-4-image': [image_files[4]],
    })

    headers = {
        "Content-type": "multipart/form-data"
    }
    # Combine form data and file data
    combined_data = {**form_data, **file_data}

    response = client.post(url, combined_data, follow=True, **headers)

    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert 'blog/feed.html' in templates
    assert 'Photos ajoutées' in response.content.decode('utf-8')
    pattern = r"dummy_image.*"
    regex = re.compile(pattern)
    for filename in os.listdir("dummy_django_blog/media"):
        if regex.match(filename):
            os.remove(f"dummy_django_blog/media/{filename}")


@pytest.mark.django_db
def test_post_photos_add_multiple_with_invalid_form(authenticate_user, mocker):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')

    # Define the URL for adding a photo
    url = reverse("photos_add_multiple")

    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, 'dummy_image.jpg')
    with open(image_path, 'rb') as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type='image/jpeg')

    form_data = {
        'form-TOTAL_FORMS': '3',
        'form-INITIAL_FORMS': '0',
        'form-MIN_NUM_FORMS': '0',
        'form-MAX_NUM_FORMS': '5',
        'form-1-title_photo': 'Test Photo 2',
        'form-1-caption': 'This is a test photo',
        'form-1-image': image,
        'form-2-title_photo': 'Test Photo 3',
        'form-2-caption': 'This is a test photo',
    }

    headers = {
        "Content-type": "multipart/form-data"
    }
    response = client.post(url, follow=True, data=form_data, **headers)
    assert response.status_code == 200
    templates = [template.name for template in response.templates]
    assert 'blog/photos_add_multiple.html' in templates


@pytest.mark.django_db
def test_post_photos_update_with_mocked_photo_option_edit(authenticate_user, mocker):
    mock_photo = mocker.MagicMock()
    mock_photo.id = 1
    mock_photo.uploader = "pytest_user"
    mock_photo.title_photo = "123@clockrock"
    mock_photo.caption = "she is my baby"
    mock_photo.image.name = "test_image.jpg"
    mocker.patch('blog.views.get_object_or_404', return_value=mock_photo)
    mock_photo.save = mocker.MagicMock()
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, 'dummy_image.jpg')
    with open(image_path, 'rb') as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type='image/jpeg')

    client = Client()
    client.login(username='pytest_user', password='p@ssword123')
    url = reverse("photos_update", kwargs={"id": 1})
    form_data = {
        "title_photo": "bebop@lula!",
        "caption": "she is my baby",
        "image": image,
        "edit_photo": True
    }
    headers = {
        "Content-type": "multipart/form-data"
    }
    response = client.post(url, follow=True, data=form_data, **headers)
    templates = [template.name for template in response.templates]
    assert 'blog/feed.html' in templates
    assert 'Photo mise à jour' in response.content.decode('utf-8')


@pytest.mark.django_db
def test_post_photos_add_with_invalid_form(authenticate_user):
    client = Client()
    client.login(username='pytest_user', password='p@ssword123')

    # Define the URL for adding a photo
    url = reverse('photos_add')

    # Load a real image file for the test
    current_dir = os.path.dirname(__file__)
    image_path = os.path.join(current_dir, 'dummy_image.jpg')
    with open(image_path, 'rb') as img_file:
        image = SimpleUploadedFile(image_path, img_file.read(), content_type='image/jpeg')

    form_data = {
        'title': 'Test Photo',
        'caption': 'This is a test photo',
        'image': "",
        'edit_photo': True
    }

    headers = {
        "Content-type": "multipart/form-data"
    }
    response = client.post(url, data=form_data, **headers)
    assert response.status_code == 200
    assert "La photo n&#x27;a pas pu être ajoutée, merci d&#x27;essayer de nouveau" in response.content.decode('utf-8')
