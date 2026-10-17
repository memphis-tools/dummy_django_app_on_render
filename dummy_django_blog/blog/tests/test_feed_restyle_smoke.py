import pytest


@pytest.mark.django_db
def test_feed_desk_and_sections_restyled(client, django_user_model):
    user = django_user_model.objects.create_user(username="testu", password="pass12345")
    other = django_user_model.objects.create_user(username="otheru", password="pass12345")
    client.force_login(user)
    user.follows.add(other)
    from blog.models import Photo, Post
    Photo.objects.create(title_photo="photo1", caption="cap", image="images_echantillons/4.jpg", uploader=other)
    r = client.get("/feed/")
    assert r.status_code == 200
    # bureau de Marlene : plus de cartes acteurs ni d'accessoires, uniquement les photos
    assert b"feed-intro-actor-card" not in r.content
    for prop in (b"feed-desk-tag", b"feed-desk-pencils", b"feed-desk-treets",
                 b"feed-desk-phone", b"feed-desk-coffee", b"feed-desk-lamp", b"feed-desk-paper"):
        assert prop not in r.content, prop
    assert b"COMMISSARIAT DE LILLE" in r.content
    # section personnages : fiches suspects
    assert b"suspects-board" in r.content and b"suspect-card" in r.content
    # section a propos : contenu detaille d'origine restaure (pre-#155)
    assert b"a_propos_container" in r.content
    assert b"Tournage" in r.content and b"Fiche technique" in r.content
