from django.db import models
from post.models import Post


# Create your models here.
def post_directory_path(instance, filename):
    return f'{instance.creating_user.id}/{filename}'


class PostImage(models.Model):
    objects = None
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='images',
    )
    image = models.ImageField(upload_to=post_directory_path, null=True, blank=True)

    class Meta:
        verbose_name = 'PostImage'
        verbose_name_plural = 'PostImages'
