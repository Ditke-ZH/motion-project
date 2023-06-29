from rest_framework import serializers
from post.models import Post
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    logged_in_user_liked = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, post):
        user = self.context['request'].user
        if post in user.liked_posts.all():
            return True
        return False

    def get_is_from_logged_in_user(self, post):
        user = self.context['request'].user
        if user == post.creating_user:
            return True
        return False

    @staticmethod
    def get_amount_of_likes(post):
        return post.liked_by_users.all().count()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['liked_by_users', 'creating_user']

    def create(self, validated_data):
        validated_data['creating_user'] = self.context['request'].user
        post = super().create(validated_data=validated_data)
        return post
