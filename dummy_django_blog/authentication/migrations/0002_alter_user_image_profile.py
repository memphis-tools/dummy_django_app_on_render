# Generated by Django 4.2.14 on 2024-07-19 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="image_profile",
            field=models.ImageField(
                blank=True,
                default="default_profile.png",
                null=True,
                upload_to="",
                verbose_name="Image de profil",
            ),
        ),
    ]
