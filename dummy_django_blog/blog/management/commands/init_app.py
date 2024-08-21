"""A dummy init script"""
import os
import re
from io import BytesIO
from PIL import Image
from datetime import datetime
import boto3
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from random import randint
from storages.backends.s3boto3 import S3Boto3Storage

from blog.models import Contributor, Photo, Post


SUPERUSER_NAME = "admin"
SUPERUSER_PASSWORD = "@pplepie94"
SUPERUSER_EMAIL = "sanjuro@localhost"
TOTAL_PHOTOS = 70
TOTAL_POSTS = 2
PHOTOS_TITLES_LIST = [
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

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_S3_REGION_NAME
)

# Define the S3 bucket name
bucket_name = settings.AWS_STORAGE_BUCKET_NAME

def file_exists_on_s3(file_key):
    s3_storage = S3Boto3Storage()
    return s3_storage.exists(file_key)


def list_s3_contents():
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    if 'Contents' in response:
        return [obj['Key'] for obj in response['Contents']]
    else:
        return []


def create_groups_and_permissions(user_model):
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

    for user in user_model.objects.all():
        if user.role == "CREATOR":
            creators.user_set.add(user)
        if user.role == "SUBSCRIBER":
            subscribers.user_set.add(user)


def create_users(user_model) -> list:
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
    user_model.objects.create_superuser(SUPERUSER_NAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD)
    for new_user in users_list:
        user = user_model.objects.create_user(**new_user)
        user.follows.add(user)

    user_1 = user_model.objects.get(username="donald")
    user_2  = user_model.objects.get(username="daisy")
    return [user_1, user_2]


def purge_database(user_model):
    current_users_size = user_model.objects.all().count()
    if current_users_size > 0:
        Post.objects.all().delete()
        Photo.objects.all().delete()
        Contributor.objects.all().delete()
        user_model.objects.all().delete()


def purge_external_storage_content():
    # List objects in the bucket
    response = s3_client.list_objects_v2(Bucket=settings.AWS_STORAGE_BUCKET_NAME)

    # Check if there are any objects to delete
    objects = response.get('Contents', [])
    if objects:
        s3_client.delete_objects(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Delete={
                'Objects': [{'Key': obj['Key']} for obj in s3_client.list_objects_v2(Bucket=settings.AWS_STORAGE_BUCKET_NAME).get('Contents', [])]
                }
        )
        # Recreate the 'media/' folder by uploading an empty placeholder file
        s3_client.put_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key='media/')


def remove_local_media_files():
    pattern = r"photo_.*|billet_.*"
    regex = re.compile(pattern)
    if os.getenv("IS_TESTING") == "True":
        try:
            for filename in os.listdir("./dummy_django_blog/media"):
                if regex.match(filename):
                    os.remove(f"./dummy_django_blog/media/{filename}")
        except Exception:
            pass
    else:
        for filename in os.listdir("./media"):
            if regex.match(filename):
                os.remove(f"./media/{filename}")


def save_a_local_media_file(file_name, uploaders_list):
    img = Image.open(file_name)
    img.thumbnail(settings.IMAGE_PREFERED_SIZE)
    img = img.save(fp=file_name)
    image_file_path = file_name
    photo = Photo.objects.create(
        title_photo=PHOTOS_TITLES_LIST[randint(0,9)],
        caption=f"Crédits France Télévision",
        uploader=uploaders_list[randint(0,1)],
        image=image_file_path,
    )
    return photo


def save_a_s3_media_file(file_path, file_name, uploaders_list):
    file_key = f"media/{file_name}"

    if not file_exists_on_s3(file_key):
        img = Image.open(file_path)
        img.thumbnail(settings.IMAGE_PREFERED_SIZE)
        img_io = BytesIO()
        img.save(img_io, format='JPEG')
        img_io.seek(0)  # Reset stream position (since we prepared image format below with 'img.save')

        # Create ContentFile for the image
        image_file = ContentFile(img_io.getvalue(), file_name)

        # Create the Photo instance and let Django handle the upload to S3
        photo = Photo.objects.create(
            title_photo=PHOTOS_TITLES_LIST[randint(0,9)],
            caption="Crédits France Télévision",
            uploader=uploaders_list[randint(0,1)],
            image=image_file,
        )
        return photo
    else:
        # Create the Photo instance without image
        photo = Photo.objects.create(
            title_photo=PHOTOS_TITLES_LIST[randint(0,9)],
            caption="Crédits France Télévision",
            uploader=uploaders_list[randint(0,1)],
        )
        photo.attach_existing_image(photo.id, file_key)
        return photo


def create_dummy_photos(uploaders_list):
    for photo_id in range(1, TOTAL_PHOTOS+1):
        if os.getenv("IS_TESTING") == "True":
            file_name = f"./dummy_django_blog/images_echantillons/photo_{photo_id}.jpg"
            save_a_local_media_file(file_name, uploaders_list)
        else:
            file_path = f"./images_echantillons/photo_{photo_id}.jpg"
            file_name = f"photo_{photo_id}.jpg"
            save_a_s3_media_file(file_path, file_name, uploaders_list)


def save_dummy_default_profile(uploaders_list):
    if os.getenv("IS_TESTING") == "True":
        file_name = f"./dummy_django_blog/images_echantillons/default_profile.png"
        img = Image.open(file_name)
        img = img.save(fp=file_name)
    else:
        s3_storage = S3Boto3Storage()
        file_path = f"./images_echantillons/default_profile.png"
        file_name = f"default_profile.png"
        file_key = f"media/default_profile.png"
        if not s3_storage.exists(file_key):
            img = Image.open(file_path)
            img_io = BytesIO()
            img.save(img_io, format='JPEG')
            img_io.seek(0)  # Reset stream position

            # Create ContentFile for the image
            image_file = ContentFile(img_io.getvalue(), f"default_profile.png")

            # Manually upload the file to S3
            s3_storage.save(file_key, image_file)


def create_dummy_posts(uploaders_list):
    if os.getenv("IS_TESTING") == "True":
        file_name = f"./dummy_django_blog/images_echantillons/billet_1.jpg"
        photo_billet_1 = save_a_local_media_file(file_name, uploaders_list)
        file_name = f"./dummy_django_blog/images_echantillons/billet_2.jpg"
        photo_billet_2 = save_a_local_media_file(file_name, uploaders_list)
    else:
        file_path = f"./images_echantillons/billet_1.jpg"
        file_name = f"billet_1.jpg"
        photo_billet_1 = save_a_s3_media_file(file_path, file_name, uploaders_list)
        file_path = f"./images_echantillons/billet_2.jpg"
        file_name = f"billet_2.jpg"
        photo_billet_2 = save_a_s3_media_file(file_path, file_name, uploaders_list)

    post = Post.objects.create(
        title="Épisode 1 : Jeux de glaces",
        content="""Le Dr Étienne Bousquet tient un centre de réinsertion pour les délinquants.
        Mais la présence de voyous perturbe sa famille.
        Lorsque deux meurtres sont commis, le nouveau commissaire, Swan Laurence, enquête avec, dans ses pattes, la trop curieuse journaliste Alice Avril.
        Si on y regarde d'un peu plus près, cette famille ne semble pas unie par les liens d'amour, et chacun des membres a un petit secret.
        Les délinquants du centre ne sont peut-être pas les plus inquiétants...""",
    )
    post.contributors.set([uploaders_list[0]]),
    post.image = photo_billet_1
    post.save()

    post = Post.objects.create(
        title="Épisode 2 : Meurtre au champagne",
        content="""L'actrice Elvire Morenkova est empoisonnée lors d'une soirée mondaine.
        Le commissaire Laurence soupçonne un meurtre alors que le suicide est la thèse la plus évidente.
        Alice, de son côté, passe des auditions pour remplacer la victime.
        Il s'avère rapidement qu'Elvire collectionnait les amants et que les mobiles ne manquent pas.""",
    )
    post.contributors.set([uploaders_list[1]])
    post.image = photo_billet_2
    post.save()


class Command(BaseCommand):
    help = "An init script for the dummy app"

    current_dir = os.path.dirname(__file__)

    def handle(self, *args, **kwargs):
        user_model = get_user_model()
        purge_database(user_model)
        remove_local_media_files()
        create_groups_and_permissions(user_model)
        uploaders_list = create_users(user_model)
        save_dummy_default_profile(uploaders_list)
        create_dummy_photos(uploaders_list)
        create_dummy_posts(uploaders_list)
