
from django.urls import path, include

from .views import ListCreateCommentAPIView

urlpatterns = [
    path('<int:post_id>', ListCreateCommentAPIView.as_view()),
]