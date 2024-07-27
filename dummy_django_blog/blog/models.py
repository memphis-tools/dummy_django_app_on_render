from django.db import models
from django.conf import settings
from django.utils.timezone import now
from PIL import Image

from .validators import MustContainsSpecialChar


class Photo(models.Model):
    class Meta:
        permissions = [
            ('add_multiple_photos', 'Peut ajouter plusieurs photos')
        ]
    title_photo = models.CharField("titre photo", max_length=125)
    caption = models.CharField("legende", max_length=350)
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=now)
    image = models.ImageField("photo")
    starred = models.BooleanField(default=False)
    IMAGE_SIZE = settings.IMAGE_PREFERED_SIZE

    def _resize_image(self):
        image = Image.open(self.image)
        image.thumbnail(self.IMAGE_SIZE)
        image.save(self.image.path)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self._resize_image()


class Post(models.Model):
    title = models.CharField("titre billet", max_length=200, validators=[MustContainsSpecialChar()])
    contributors = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through="Contributor",
        related_name="contributions"
    )
    created_at = models.DateTimeField(default=now)
    content = models.CharField("description", max_length=2500)
    image = models.ForeignKey(Photo, null=True, on_delete=models.SET_NULL)
    starred = models.BooleanField(default=False)
    word_count = models.IntegerField(default=0)

    def _get_word_count(self):
        return len(self.content.strip(" "))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.word_count = self._get_word_count()


class Contributor(models.Model):
    contributor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    contribution = models.CharField(max_length=250, blank=True)

    class Meta:
        unique_together = ("contributor", "post")
