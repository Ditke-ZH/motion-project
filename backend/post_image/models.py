from django.core.validators import FileExtensionValidator
from django.db import models
from post.models import Post


# Create your models here.
def post_directory_path(instance, filename):
    return f'{instance.post_id}/{filename}'


class PostImage(models.Model):
    objects = None
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='images',
    )

    image = models.ImageField(
        upload_to=post_directory_path,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])],
        max_length=None,  # Designates the maximum length for the file name.
    )

    class Meta:
        verbose_name = 'Upload'
        verbose_name_plural = 'Uploads'
