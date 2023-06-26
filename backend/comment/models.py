from django.db import models


# Create your models here.
class Comment(models.Model):
    post = models.CharField(max_length=100)
    commenting_user = models.CharField(max_length=100)
    text = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
