from rest_framework.generics import ListCreateAPIView

from .models import Comment
from .serializers import CommentSerializer


# Create your views here.

class ListCreateCommentAPIView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


"""
    def get_queryset(self):
        user = self.request.user
        following_ids = user.following.values_list('id', flat=True)
        return Comment.objects.filter(creating_user_id__in=following_ids).order_by('-created_date')
"""
