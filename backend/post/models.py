from django.db import models
from django.conf import settings
from backend.user.models import User

# Create your models here.


class Post(models.Model):
    creating_user = models.ForeignKey(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts',
    )

    title = models.TextField(verbose_name='title')
    content = models.TextField(verbose_name='content')
    created_date = models.DateTimeField(verbose_name='created', auto_now_add=True)
    external_link = models.TextField(verbose_name='external_link')

    liked_by_users = models.ManyToManyField(
        to=User,
        related_name="liked_posts",
        blank=True
    )

    like_count = models.IntegerField(
        default=0,
        blank=True
    )

    linked_posts = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False
    )

    comments = models.ForeignKey(
        to=Comment,
        on_delete=models.CASCADE,
        related_name="post_comments",
        null=True,
        blank=True
    )

    images = models.ForeignKey(
        to=Post_Image,
        on_delete=models.CASCADE,
        related_name='post_images',
        blank=True
    )

    def __str__(self):
        return f"{self.creating_user}: {self.title} - {self.content[:50]} ..."
