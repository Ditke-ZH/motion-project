from django.contrib.auth import get_user_model
from drf_yasg.openapi import Response
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from backend.user.serializers import UserSerializer

User = get_user_model()


class ViewAllUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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

    class ViewAllFollowersUserFollowing(ListAPIView):
        serializer_class = UserSerializer

        def get_queryset(self):
            return User.objects.filter(follows_users=self.request.user)

    class ViewAllFollowers(ListAPIView):
        serializer_class = UserSerializer

        def get_queryset(self):
            return User.objects.filter(is_followed_by_users=self.request.user)
