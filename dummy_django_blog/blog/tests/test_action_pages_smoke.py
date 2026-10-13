import pytest


@pytest.mark.django_db
def test_action_pages_have_encart_and_card(client, django_user_model):
    user = django_user_model.objects.create_user(username="testu", password="pass12345")
    client.force_login(user)
    routes = {
        "follow": "/users/follow/",
        "signin": "/signin/",
        "password-change": "/password-change/",
        "password_reset": "/password_reset/",
        "posts_add": "/posts/add/",
        "photos_add": "/photos/add/",
        "photos_add_multiple": "/photos/add-multiple/",
    }
    missing = []
    for name, url in routes.items():
        r = client.get(url)
        ok = r.status_code == 200 and b"action-encart" in r.content and b"action-card" in r.content
        print(name, r.status_code, b"action-encart" in r.content, b"action-card" in r.content)
        if not ok:
            missing.append((name, r.status_code))

    from blog.models import Photo
    photo = Photo.objects.create(
        title_photo="photo1", caption="cap", image="images_echantillons/4.jpg", uploader=user
    )
    from blog.models import Post
    post = Post.objects.create(title="enquete 1959", content="corps de texte")
    post.contributors.add(user)
    for name, url in {
        "photos_delete": f"/photos/{photo.id}/delete/",
        "photos_update": f"/photos/{photo.id}/update/",
        "posts_delete": f"/posts/{post.id}/delete/",
        "posts_update": f"/posts/{post.id}/update/",
    }.items():
        r = client.get(url)
        ok = r.status_code == 200 and b"action-encart" in r.content and b"action-card" in r.content
        print(name, r.status_code, b"action-encart" in r.content, b"action-card" in r.content)
        if not ok:
            missing.append((name, r.status_code))
    assert not missing, missing
