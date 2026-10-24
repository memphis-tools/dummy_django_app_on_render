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
    # section a propos : Tournage present, Fiche technique retiree (deplacee sur le plan de Lille)
    assert b"a_propos_container" in r.content
    assert b"Tournage" in r.content and b"Fiche technique" not in r.content
    # tableau d'enquete : plan de Lille + personnes de la fiche technique punaisees
    assert b"feed-lille-plan" in r.content and b"plan_lille_1920.jpg" in r.content
    assert b"feed-fiche-people" in r.content
    assert b"feed-fiche-photo--unknown" in r.content
    assert b"TITRE" in r.content and b"SOC. DE PRODUCTION" in r.content and b"PUBLIC" in r.content
