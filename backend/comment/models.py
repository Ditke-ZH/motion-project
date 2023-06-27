from django.contrib.auth import get_user_model
from django.db import models

from post.models import Post

User = get_user_model()


class Comment(models.Model):
    post = models.ManyToManyField(Post)
    commenting_user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post id: {self.post} {self.text[:10]}... by user: {self.commenting_user}"
