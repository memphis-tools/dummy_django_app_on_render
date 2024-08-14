"""A dummy init script"""
import os
import re
from datetime import datetime
from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from PIL import Image
from random import randint
from blog.models import Photo, Post


def create_groups_and_permissions():
    User = get_user_model()

    add_photo = Permission.objects.get(codename="add_photo")
    add_multiple_photos = Permission.objects.get(codename="add_multiple_photos")
    change_photo = Permission.objects.get(codename="change_photo")
    delete_photo = Permission.objects.get(codename="delete_photo")
    view_photo = Permission.objects.get(codename="view_photo")

    add_post = Permission.objects.get(codename="add_post")
    change_post = Permission.objects.get(codename="change_post")
    delete_post = Permission.objects.get(codename="delete_post")
    view_post = Permission.objects.get(codename="view_post")

    creators_perms = [
        add_photo,
        add_multiple_photos,
        change_photo,
        delete_photo,
        view_photo,
        add_post,
        change_post,
        delete_post,
        view_post,
    ]

    creators, created = Group.objects.get_or_create(name="creators")
    creators.save()
    creators.permissions.set(creators_perms)

    subscribers, created = Group.objects.get_or_create(name="subscribers")
    subscribers.save()
    subscribers.permissions.add(view_photo)
    subscribers.permissions.add(view_post)

    for user in User.objects.all():
        if user.role == "CREATOR":
            creators.user_set.add(user)
        if user.role == "SUBSCRIBER":
            subscribers.user_set.add(user)


class Command(BaseCommand):
    help = "An init script for the dummy app"

    current_dir = os.path.dirname(__file__)

    def handle(self, *args, **kwargs):
        now = datetime.utcnow()
        User = get_user_model()
        SUPERUSER_NAME = "admin"
        SUPERUSER_PASSWORD = "@pplepie94"
        SUPERUSER_EMAIL = "sanjuro@localhost"
        users_list = [
            {
                "username": "donald",
                "first_name": "donald",
                "last_name": "duck",
                "password": "@pplepie94",
                "email": "d.duck@localhost",
            },
            {
                "username": "daisy",
                "first_name": "daisy",
                "last_name": "duck",
                "password": "@pplepie94",
                "email": "daisy.duck@localhost",
            },
        ]

        current_users_size = User.objects.all().count()
        if current_users_size > 0:
            User.objects.all().delete()
            now = datetime.utcnow()

        pattern = r"photo_.*|billet_.*"
        regex = re.compile(pattern)
        if os.getenv("IS_TESTING") == "True":
            for filename in os.listdir("./dummy_django_blog/media"):
                if regex.match(filename):
                    os.remove(f"./dummy_django_blog/media/{filename}")
        else:
            for filename in os.listdir("./media"):
                if regex.match(filename):
                    os.remove(f"./media/{filename}")

        create_groups_and_permissions()

        User.objects.create_superuser(SUPERUSER_NAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD)
        for new_user in users_list:
            user = User.objects.create_user(**new_user)
            user.follows.add(user)

        user_1 = User.objects.get(username="donald")
        user_2  = User.objects.get(username="daisy")
        uploaders_list = [user_1, user_2]

        photos_titles_list = [
            "Un des épisodes les plus drôles",
            "Un des épisodes les plus romantiques",
            "Un des épisodes les plus étranges",
            "Un des épisodes les plus sympas",
            "Un des épisodes les plus décalés",
            "Un des épisodes les plus inoubliables",
            "Un des épisodes les plus regardés",
            "Un des épisodes les plus rocambolesques",
            "Un des épisodes les plus remarquables",
            "Un des épisodes les plus rétro",
        ]

        for photo_id in range(1,55):
            if os.getenv("IS_TESTING") == "True":
                img = Image.open(f"./dummy_django_blog/images_echantillons/photo_{photo_id}.jpg")
                img.thumbnail(settings.IMAGE_PREFERED_SIZE)
                img = img.save(fp=f"./dummy_django_blog/media/photo_{photo_id}.jpg")
            else:
                img = Image.open(f"./images_echantillons/photo_{photo_id}.jpg")
                img.thumbnail(settings.IMAGE_PREFERED_SIZE)
                img = img.save(fp=f"./media/photo_{photo_id}.jpg")
            photo = Photo.objects.create(
                title_photo=photos_titles_list[randint(0,5)],
                caption=f"Crédits France Télévision",
                uploader=uploaders_list[randint(0,1)],
                image=f"./photo_{photo_id}.jpg",
            )
            photo.save()

        if os.getenv("IS_TESTING") == "True":
            img = Image.open(f"./dummy_django_blog/images_echantillons/default_profile.png")
            img = img.save(fp=f"./dummy_django_blog/media/default_profile.png")

            img = Image.open(f"./dummy_django_blog/images_echantillons/alice_avril.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./dummy_django_blog/media/alice_avril.jpg")

            img = Image.open(f"./dummy_django_blog/images_echantillons/swan_laurence.png")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./dummy_django_blog/media/swan_laurence.png")

            img = Image.open(f"./dummy_django_blog/images_echantillons/marlene_leroy.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./dummy_django_blog/media/marlene_leroy.jpg")

            img = Image.open(f"./dummy_django_blog/images_echantillons/billet_1.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./dummy_django_blog/media/billet_1.jpg")
            img = Image.open(f"./dummy_django_blog/images_echantillons/billet_2.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./dummy_django_blog/media/billet_2.jpg")
        else:
            img = Image.open(f"./images_echantillons/default_profile.png")
            img = img.save(fp=f"./media/default_profile.png")

            img = Image.open(f"./images_echantillons/alice_avril.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./media/alice_avril.jpg")

            img = Image.open(f"./images_echantillons/swan_laurence.png")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./media/swan_laurence.png")

            img = Image.open(f"./images_echantillons/marlene_leroy.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./media/marlene_leroy.jpg")

            img = Image.open(f"./images_echantillons/billet_1.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./media/billet_1.jpg")
            img = Image.open(f"./images_echantillons/billet_2.jpg")
            img.thumbnail(settings.IMAGE_PREFERED_SIZE)
            img = img.save(fp=f"./media/billet_2.jpg")

        photo_billet_1 = Photo.objects.create(
            title_photo="Photo épisode 1",
            caption=f"Crédits France Télévision",
            uploader=user_1,
            image=f"./billet_1.jpg",
        )
        photo_billet_2 = Photo.objects.create(
            title_photo="Photo épisode 2",
            caption=f"Crédits France Télévision",
            uploader=user_2,
            image=f"./billet_2.jpg",
        )
        photo_billet_2.save()

        post = Post.objects.create(
            title="Épisode 1 : Jeux de glaces",
            content="""Le Dr Étienne Bousquet tient un centre de réinsertion pour les délinquants.
            Mais la présence de voyous perturbe sa famille.
            Lorsque deux meurtres sont commis, le nouveau commissaire, Swan Laurence, enquête avec, dans ses pattes, la trop curieuse journaliste Alice Avril.
            Si on y regarde d'un peu plus près, cette famille ne semble pas unie par les liens d'amour, et chacun des membres a un petit secret.
            Les délinquants du centre ne sont peut-être pas les plus inquiétants...""",
            image=photo_billet_1,
        )
        post.contributors.set([user_1]),
        post.save()

        post = Post.objects.create(
            title="Épisode 2 : Meurtre au champagne",
            content="""L'actrice Elvire Morenkova est empoisonnée lors d'une soirée mondaine.
            Le commissaire Laurence soupçonne un meurtre alors que le suicide est la thèse la plus évidente.
            Alice, de son côté, passe des auditions pour remplacer la victime.
            Il s'avère rapidement qu'Elvire collectionnait les amants et que les mobiles ne manquent pas.""",
            image=photo_billet_2,
        )
        post.contributors.set([user_2]),
        post.save()
