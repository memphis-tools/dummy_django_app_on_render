# Generated by Django 4.2.14 on 2024-07-19 07:07

import authentication.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0005_alter_user_image_profile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="image_profile",
            field=models.ImageField(
                default="default_profile.png",
                upload_to=authentication.models.upload_to_avatars,
                verbose_name="Image de profil",
            ),
        ),
    ]
