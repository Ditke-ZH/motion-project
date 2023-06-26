
from django.urls import path, include

from .views import ListCreateCommentAPIView

urlpatterns = [
    path('', ListCreateCommentAPIView.as_view()),
]