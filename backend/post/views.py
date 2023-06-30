from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from email_scheduler.models import EmailScheduler
from .permissions import IsOwnerIsAdminOrReadOnly
from django.db.models import Q
from post.models import Post
from post.serializers import PostSerializer

User = get_user_model()


class PostListCreateView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_date')
        search_string = self.request.query_params.get('search', )
        if search_string is not None:
            queryset = queryset.filter(Q(title__icontains=search_string) | Q(content__icontains=search_string))
        return queryset

    def perform_create(self, serializer):
        serializer.save(creating_user=self.request.user)

        followers = User.objects.filter(follows_users=self.request.user)
        for receiver in followers:
            # create email to receiver
            mail_instance = EmailScheduler.objects.all()
            message = f'Dear {receiver.username}\n\n{self.request.user.username} has just posted something interesting!'
            subject = f'Motion-3: new post from {self.request.user.username}'
            mail_instance.create(subject=subject, message=message, recipient_list=receiver.email)


class PostSearchView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerIsAdminOrReadOnly]
    lookup_url_kwarg = 'post_id'

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class UserPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(creating_user_id=user_id).order_by('-created_date')


class FollowingPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        following_ids = user.follows_users.values_list('id', flat=True)
        return Post.objects.filter(creating_user_id__in=following_ids).order_by('-created_date')


class FriendsPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        current_user = self.request.user

        friends_ids = User.objects.filter(
            Q(friendrequests_sent__state='A', friendrequests_sent__receiving_user=current_user)
            | Q(friendrequests_received__state='A', friendrequests_received__sending_user=current_user))

        return Post.objects.filter(creating_user_id__in=friends_ids).order_by('-created_date')


class PostToggleLikeView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = 'post_id'

    def post(self, request, *args, **kwargs):
        post = self.get_object()
        user = request.user
        if user in post.liked_by_users.all():
            post.liked_by_users.remove(user)
        else:
            post.liked_by_users.add(user)
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class UserLikedPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return user.liked_posts.all().order_by('-created_date')
