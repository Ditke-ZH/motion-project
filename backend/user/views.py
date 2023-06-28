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

        liked_things = LikedThing.objects.filter(user_profile__user=self.request.user)
        for instance in liked_things:
            serializer = LikedThingsSerializer(instance, self.request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(user_profile=user_profile)


class ToggleFollowing(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'

    def patch(self, request, *args, **kwargs):
        follows_users = self.get_object()
        is_followed_by_users = self.request.user
        user_following = follows_users in is_followed_by_users.follows_users.all()
        if user_following:
            is_followed_by_users.follows_users.remove(follows_users)
        else:
            is_followed_by_users.follows_users.add(follows_users)
        return Response(self.get_serializer(follows_users).data)


class ViewAllFollowers(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(follows_users=self.request.user)


class ViewAllFollowing(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_followed_by_users=self.request.user)
