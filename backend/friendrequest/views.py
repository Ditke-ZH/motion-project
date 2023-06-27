from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView

from friendrequest.models import Friendrequest
from friendrequest.serializers import FriendrequestSerializer
from user.serializers import UserSerializer

User = get_user_model()


class FriendsListView(ListAPIView):
    def get_queryset(self):
        current_user = self.request.user
        result = User.objects.filter(
            Q(friendrequests_sent__state='A', friendrequests_sent__receiving_user=current_user)
            | Q(friendrequests_received__state='A', friendrequests_received__sending_user=current_user))

        return result

    serializer_class = UserSerializer


class FriendrequestListView(ListAPIView):
    def get_queryset(self):
        current_user = self.request.user
        result = Friendrequest.objects.filter(
            Q(receiving_user=current_user)
            | Q(sending_user=current_user))

        return result

    serializer_class = FriendrequestSerializer


class FriendrequestPostView(CreateAPIView):
    queryset = Friendrequest.objects.all()
    serializer_class = FriendrequestSerializer

    def perform_create(self, serializer):
        receiver = get_object_or_404(User, id=self.kwargs['user_id'])
        serializer.save(sending_user=self.request.user, receiving_user=receiver)


class FriendrequestGetPatchDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Friendrequest.objects.all()
    serializer_class = FriendrequestSerializer
    lookup_field = 'id'
