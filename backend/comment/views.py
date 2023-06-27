from rest_framework.generics import ListCreateAPIView

from .models import Comment
from .serializers import CommentSerializer


# Create your views here.

class ListCreateCommentAPIView(ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post=post_id).order_by('-created_date')
