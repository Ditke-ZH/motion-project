from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)
    # follower: is_followed_by_users and following: follows_users
    is_followed_by_users = models.ManyToManyField(to='User', related_name='follows_users', blank=True)

    def __str__(self):
        return self.username
