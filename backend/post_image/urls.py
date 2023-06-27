from django.urls import path
from .views import PostImageListCreateView, PostImageRetrieveUpdateDeleteView

urlpatterns = [
    path('post-images/', PostImageListCreateView.as_view(), name='post-image-list-create'),
    path('post-images/<int:pk>/', PostImageRetrieveUpdateDeleteView.as_view(), name='post-image-retrieve-update-delete'),
]
