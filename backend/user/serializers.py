from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'follower', 'following']


class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'follower', 'following']


class UserSerializer(serializers.ModelSerializer):
    following = UserFollowingSerializer(many=True, read_only=True)
    follower = UserFollowerSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'follower', 'following']
