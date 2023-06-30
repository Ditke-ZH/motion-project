from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from email_scheduler.models import EmailScheduler
from liked_thing.models import LikedThing
from user.permissions import ObjNotLoggedInUser
from user.serializers import UserSerializer, UserProfileSerializer
from user_profile.models import UserProfile

User = get_user_model()


class ViewAllUsers(ListAPIView):
    """
        get:
        View all users

    """
    # queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(Q(username__icontains=search) |
                                       Q(first_name__icontains=search) |
                                       Q(last_name__icontains=search))
        return queryset


class ViewOneUser(RetrieveAPIView):
    """
        get:
        Get a specific user information

    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'


class RetrieveUpdateDestroyLoggedInUser(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific user information

        delete:
        Delete a specific user

        patch:
        Update a specific user

    """
    serializer_class = UserSerializer

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()
        user_profile = UserProfile.objects.filter(user=self.request.user).first()
        instance = user_profile
        serializer = UserProfileSerializer(instance, self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        for element in self.request.data['text']:
            liked_things = LikedThing.objects.filter(user_profile__user=self.request.user).values_list('text',
                                                                                                       flat=True)
            if element not in liked_things:
                instance = LikedThing.objects.all()
                instance.create(text=element, user_profile=user_profile)
            elif element in liked_things:
                instance = LikedThing.objects.filter(text=element, user_profile=user_profile)
                instance.delete()


class ToggleFollowing(CreateAPIView):
    """
        Post:
        Toggle the following user

    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'
    permission_classes = [ObjNotLoggedInUser]

    def post(self, request, *args, **kwargs):
        follows_users = self.get_object()
        is_followed_by_users = self.request.user
        user_following = follows_users in is_followed_by_users.follows_users.all()
        if user_following:
            is_followed_by_users.follows_users.remove(follows_users)
        else:
            is_followed_by_users.follows_users.add(follows_users)
            # create email to follows_user
            mail_instance = EmailScheduler.objects.all()
            message = f'Dear {follows_users.username}\n\n{is_followed_by_users.username} is following you now!'
            mail_instance.create(subject='Motion-3: new Follower', message=message, recipient_list=follows_users.email)
        return Response(self.get_serializer(follows_users).data)


class ViewAllFollowers(ListAPIView):
    """
        get:
        List of following users of a logged-in user

    """
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(follows_users=self.request.user)


class ViewAllFollowing(ListAPIView):
    """
        get:
        List of users followed by the logged-in user

    """
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_followed_by_users=self.request.user)
