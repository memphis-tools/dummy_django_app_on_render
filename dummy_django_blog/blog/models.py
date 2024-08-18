from PIL import Image
from io import BytesIO
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from django.utils.timezone import now

from .validators import MustContainsDigit


class Photo(models.Model):
    class Meta:
        permissions = [
            ('add_multiple_photos', 'Peut ajouter plusieurs photos')
        ]
    title_photo = models.CharField("titre photo", max_length=125)
    caption = models.CharField("legende", max_length=350)
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(default=now)
    image = models.ImageField("photo", upload_to="media/", null=True, blank=True)
    starred = models.BooleanField(default=False)
    IMAGE_SIZE = settings.IMAGE_PREFERED_SIZE

    def _resize_image(self):
        # Open the image from the file
        image = Image.open(self.image)
        # Resize the image
        image.thumbnail(self.IMAGE_SIZE)

        # Save the image to a temporary file
        img_temp = BytesIO()
        image.save(img_temp, format=image.format)
        img_temp.seek(0)

        # Return the resized image content
        return ContentFile(img_temp.read(), self.image.name)

    def attach_existing_image(self, photo_id, file_key):
        Photo.objects.filter(id=photo_id).update(image=file_key)

    def save(self, *args, **kwargs):
        if self.image:
            # Resize the image and set it to the field
            resized_image = self._resize_image()
            self.image = resized_image
        super().save(*args, **kwargs)


class Post(models.Model):
    title = models.CharField("titre billet", max_length=200, validators=[MustContainsDigit()])
    contributors = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through="Contributor",
        related_name="contributions"
    )
    created_at = models.DateTimeField(default=now)
    content = models.CharField("description", max_length=2500)
    image = models.ForeignKey(Photo, null=True, on_delete=models.SET_NULL, blank=True)
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
