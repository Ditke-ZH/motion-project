from django.db import models


class LikedThing(models.Model):

    text = models.TextField(max_length=100, blank=True)
    user_profile = models.ForeignKey(to='UserProfile', many=True, on_delete=models.CASCADE, related_name='liked_things')
