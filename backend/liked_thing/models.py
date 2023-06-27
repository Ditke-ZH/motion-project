from django.db import models

from user_profile.models import UserProfile


class LikedThing(models.Model):

    text = models.TextField(max_length=100, blank=True)
    user_profile = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE, related_name='liked_things')
