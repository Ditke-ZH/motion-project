from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView

from backend.comment.models import Comment
from backend.comment.serializers import CommentSerializer


# Create your views here.

class ListCreateCommentAPIView(ListCreateAPIView):
    model = Comment
    serializer_class = CommentSerializer