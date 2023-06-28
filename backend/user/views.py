from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView

from liked_thing.models import LikedThing
from user.serializers import UserSerializer, UserProfileSerializer, LikedThingsSerializer
from user_profile.models import UserProfile

User = get_user_model()


class ViewAllUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ViewOneUser(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'


class RetrieveUpdateDestroyLoggedInUser(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
        user_profile = UserProfile.objects.filter(user=self.request.user).first()
        instance = user_profile
        serializer = UserProfileSerializer(instance, self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        liked_things = LikedThing.objects.filter(user=self.request.user).first()
        instance = liked_things
        serializer = LikedThingsSerializer(instance, self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()


class ToggleFollowing(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'

    def patch(self, request, *args, **kwargs):
        is_followed_by_users = self.get_object()
        follows_users = self.request.user
        user_is_followed_by_users = is_followed_by_users in follows_users.is_followed_by_users.all()
        if user_is_followed_by_users:
            follows_users.is_followed_by_users.remove(is_followed_by_users)
        else:
            follows_users.is_followed_by_users.add(is_followed_by_users)
        return Response(self.get_serializer(is_followed_by_users).data)


class ViewAllFollowing(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(follows_users=self.request.user)


class ViewAllFollowers(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_followed_by_users=self.request.user)
