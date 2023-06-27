from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.liked_thing.models import LikedThing
from backend.user_profile.models import UserProfile

User = get_user_model()


class IsFollowedByUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'follower', 'following']


class FollowsUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'follower', 'following']

class LikedThingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedThing
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    liked_things = LikedThingsSerializer(many=True)
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    follows_users = FollowsUsersSerializer(many=True, read_only=True)
    is_followed_by_users = IsFollowedByUsersSerializer(many=True, read_only=True)
    user_profile = UserProfileSerializer(many=True)

    class Meta:
        model = User
        fields = ['username', 'follows_users', 'is_followed_by_users', 'email', 'user_profile']
