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
    assert b"feed-lille-plan" in r.content and b"carte_lieux_cles.svg" in r.content
    assert b"wikipedia.org" in r.content  # noms de la fiche technique lies vers Wikipedia
    assert b"feed-fiche-people" in r.content
    assert b"feed-fiche-photo--unknown" in r.content
    # notes visiteurs hors tableau + post-it equipes + recompenses icones
    assert b"feed-visitor-notes" in r.content and b"LES PETITS MEURTRES D'AGATHA CHRISTIE" in r.content
    assert b"D&Eacute;CORS" in r.content and b"COSTUMES" in r.content and b"MUSIQUE" in r.content
    assert b"didier_bivel.jpg" in r.content and b"jeanluc_gaget.jpg" in r.content and b"marc_angelo.jpg" in r.content  # photos libres trouvees
    assert b"feed-evidence-slot--photos" in r.content  # bureau de depot dans la section photos
    assert b"awards-list" in r.content and b"award-icon" in r.content
    # croquis interactif : pastilles lieux avec photo au survol
    assert b"feed-map-hotspot" in r.content and b"villa_cavrois.jpg" in r.content
    assert b"malo_plage.jpg" in r.content and b"beffroi_lille.jpg" in r.content and b"vieux_lille_maison.jpg" in r.content
    # commissariat et lieux de tournage : miniatures au survol
    assert b"commissariat_lille.jpg" in r.content and b"chateau_tilques.jpg" in r.content and b"chateau_wambrechies.jpg" in r.content
    # nouvelles photos libres fournies (Opéra, Woreth, Magellan)
    assert b"opera_lille.jpg" in r.content and b"eric_woreth.jpg" in r.content and b"murielle_magellan.jpg" in r.content

@pytest.mark.django_db
def test_feed_croquis_new_locations_and_no_label(client, django_user_model):
    user = django_user_model.objects.create_user(username="testu2", password="pass12345")
    other = django_user_model.objects.create_user(username="otheru2", password="pass12345")
    client.force_login(user)
    user.follows.add(other)
    from blog.models import Photo
    Photo.objects.create(title_photo="photo1", caption="cap", image="images_echantillons/4.jpg", uploader=other)
    r = client.get("/feed/")
    assert r.status_code == 200
    # feed-interrogation-label supprime
    assert b"feed-interrogation-label" not in r.content
    # nouveaux lieux fournis par l'utilisateur : pastilles interactives
    assert b"chateau_steene.jpg" in r.content
    assert b"bethune_grand_place.jpg" in r.content
    assert b"voix_du_nord.jpg" in r.content
    assert b"kursaal.jpg" in r.content and b"citadelle_lille.jpg" in r.content and b"hotel_de_ville_lille.jpg" in r.content
    assert b"styles_manoir.jpg" in r.content
    # fichiers statiques reels
    import os
    img_dir = os.path.join(os.path.dirname(__file__), "..", "..", "static", "vendors", "img")
    for f in ("chateau_steene.jpg", "bethune_grand_place.jpg", "voix_du_nord.jpg",
              "kursaal.jpg", "citadelle_lille.jpg", "hotel_de_ville_lille.jpg", "styles_manoir.jpg"):
        assert os.path.exists(os.path.join(img_dir, f)), f

def test_feed_sophie_revil_photo(client_dummy=None):
    import os
    from pathlib import Path
    img = Path(__file__).resolve().parents[2] / "static" / "vendors" / "img" / "sophie_revil.jpg"
    assert img.exists()
