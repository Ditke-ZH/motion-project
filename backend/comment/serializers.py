from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    commenting_user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'post', 'commenting_user', 'text', 'created_date']
        read_only_fields = ['commenting_user', 'post']

    def get_commenting_user(self, obj):
        user = self.context['request'].user
        return f"{user.first_name} {user.last_name}"
