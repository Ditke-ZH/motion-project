from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import PostImage
from .serializers import PostImageSerializer


# Create your views here.
class PostImageListCreateView(ListCreateAPIView):
    """
        get:
        List of images linked with the post
    """
    queryset = PostImage.objects.all().order_by('-created_date')
    serializer_class = PostImageSerializer


class PostImageRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific post_image information

        delete:
        Delete a specific post_image information

        patch:
        Update a specific post_image information

    """
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
    # permission_classes = [IsOwnerIsAdminOrReadOnly]
