# Generated by Django 4.2.14 on 2024-07-24 15:24

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentication", "0007_alter_user_follows"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="follows",
            field=models.ManyToManyField(
                limit_choices_to={"is_superuser": False, "role": "CREATOR"},
                to=settings.AUTH_USER_MODEL,
                verbose_name="abonnements",
            ),
        ),
    ]
