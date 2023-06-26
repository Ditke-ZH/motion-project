from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)

    follows_users = models.ManyToManyField(to='User', related_name='is_followed_by_users', blank=True)

    def __str__(self):
        return self.username
