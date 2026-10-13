import pytest

@pytest.mark.django_db
def test_feed_posts_photos_styling(client, django_user_model):
    user = django_user_model.objects.create_user(username="testu", password="pass12345")
    other = django_user_model.objects.create_user(username="otheru", password="pass12345")
    client.force_login(user)
    user.follows.add(other)
    from blog.models import Photo, Post
    photo = Photo.objects.create(title_photo="photo1", caption="cap", image="images_echantillons/4.jpg", uploader=other)
    post = Post.objects.create(title="enquete 1959", content="corps")
    post.contributors.add(other)
    r = client.get("/feed/")
    assert b"feed-evidence-slot" in r.content and b"feed-evidence-deck" in r.content and b"COMMISSARIAT DE LILLE" in r.content, "feed desk missing"
    assert b"feed-photos-strip" not in r.content, "old strip still present"
    r = client.get("/photos/")
    assert b"evidence-card" in r.content and b"evidence-stamp" in r.content, "photos evidence styling missing"
    r = client.get("/posts/")
    assert b"case-file-card" in r.content and b"CASE FILE" in r.content, "posts case-file styling missing"
