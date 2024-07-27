from django.db import models
from django.contrib.auth.models import AbstractUser, Group


def upload_to_avatars(instance, filename):
    return 'avatars/{filename}'.format(filename=filename)


class User(AbstractUser):
    CREATOR = "CREATOR"
    SUBSCRIBER = "SUBSCRIBER"
    ROLES_CHOICES = (
        (CREATOR, "créateur"),
        (SUBSCRIBER, "abonné"),
    )
    image_profile = models.ImageField(
        verbose_name="Image de profil",
        null=False,
        blank=False,
        default="default_profile.png",
        upload_to=upload_to_avatars,
    )
    role = models.CharField(max_length=25, choices=ROLES_CHOICES, default=CREATOR, verbose_name="role")
    follows = models.ManyToManyField(
        "self",
        limit_choices_to={
            "role": CREATOR,
            "is_superuser": False
        },
        symmetrical=False,
        verbose_name="abonnements"
    )

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.role == "CREATOR":
            group = Group.objects.get(name="creators")
            group.user_set.add(self)
        elif self.role == "SUBSCRIBER":
            group = Group.objects.get(name="subscribers")
            group.user_set.add(self)
        self.follows.add(self)
