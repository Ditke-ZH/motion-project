from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()


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
    external_link = models.TextField(verbose_name='external_link', blank=True)

    liked_by_users = models.ManyToManyField(
        to=User,
        related_name="liked_posts",
        blank=True
    )

    linked_posts = models.ForeignKey(
        to='Post',
        blank=True,
        symmetrical=False,
        on_delete=models.CASCADE,
        related_name="linked_by_posts"
    )

    def __str__(self):
        return f"{self.creating_user}: {self.title} - {self.content[:50]} ..."
