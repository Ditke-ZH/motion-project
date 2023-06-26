from rest_framework import serializers

from backend.comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    model = Comment
    fields = ['id', 'post_id', 'text', 'created_date']
