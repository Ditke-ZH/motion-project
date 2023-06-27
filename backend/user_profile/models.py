from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def user_directory_path_avatar(instance, filename):
    return f'avatar/{instance.id}/{filename}'


def user_directory_path_banner(instance, filename):
    return f'banner/{instance.id}/{filename}'


class UserProfile(models.Model):
    user = models.OneToOneField(to='User', related_name='user_profile', blank=True, on_delete=models.CASCADE)
    location = models.CharField(max_length=250, blank=True)
    avatar = models.ImageField(upload_to=user_directory_path_avatar, blank=True, null=True)
    banner = models.ImageField(upload_to=user_directory_path_banner, blank=True, null=True)
    phone_no = models.CharField(max_length=30, null=True, blank=True)
    about = models.TextField(max_length=250, null=True, blank=True)
