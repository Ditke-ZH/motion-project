from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .permissions import IsOwnerIsAdminOrReadOnly
from django.db.models import Q
from post.models import Post
from post.serializers import PostSerializer

User = get_user_model()


class PostListCreateView(ListCreateAPIView):
    """
        get:
        List all the posts of all users in chronological order

        post:
        create a post
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_date')
        search_string = self.request.query_params.get('search', )
        if search_string is not None:
            queryset = queryset.filter(Q(title__icontains=search_string) | Q(content__icontains=search_string))
        return queryset

    def perform_create(self, serializer):
        serializer.save(creating_user=self.request.user)


class PostSearchView(ListAPIView):
    """
        get:
        Search posts of all users and list result in chronological order
    """
    serializer_class = PostSerializer


class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific post by ID and display all the information about that post

        delete:
        Delete a post by ID (allowed for owner of the post or an admin)

        patch:
        Update a specific post (allowed for owner of the post or an admin)
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerIsAdminOrReadOnly]
    lookup_url_kwarg = 'post_id'

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class UserPostListView(ListAPIView):
    """
        get:
        List all the posts of a specific user in chronological order
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Post.objects.filter(creating_user_id=user_id).order_by('-created_date')


class FollowingPostListView(ListAPIView):
    """
        get:
        List all the posts of followed users in chronological order
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        following_ids = user.follows_users.values_list('id', flat=True)
        return Post.objects.filter(creating_user_id__in=following_ids).order_by('-created_date')


class FriendsPostListView(ListAPIView):
    """
        get:
        List all the posts of the logged in user’s friends in chronological order
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        current_user = self.request.user

        friends_ids = User.objects.filter(
            Q(friendrequests_sent__state='A', friendrequests_sent__receiving_user=current_user)
            | Q(friendrequests_received__state='A', friendrequests_received__sending_user=current_user))

        return Post.objects.filter(creating_user_id__in=friends_ids).order_by('-created_date')


class PostToggleLikeView(CreateAPIView):
    """
        post:
        Toggle the like
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
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
    """
        get:
        List all the user who liked the specific post
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        return user.liked_posts.all().order_by('-created_date')
