from rest_framework.generics import ListCreateAPIView
from rest_framework.exceptions import ValidationError

from post.models import Post
from .models import Comment
from .serializers import CommentSerializer


# Create your views here.


class ListCreateCommentAPIView(ListCreateAPIView):
    """
        get:
        List all comments of a ordered by chronologically

        post:
        Create a new comment for a post
    """

    serializer_class = CommentSerializer
    lookup_url_kwarg = 'post_id'

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post=post_id).order_by('-created_date')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        user = self.request.user

        post_instance = Post.objects.filter(id=post_id)

        if not user.is_authenticated:
            raise ValidationError("User must be authenticated to create a comment.")

        serializer.save(commenting_user=user, post=post_instance)
