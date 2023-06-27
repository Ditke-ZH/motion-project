from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import PostImage
from .serializers import PostImageSerializer


# Create your views here.
class PostImageListCreateView(ListCreateAPIView):
    queryset = PostImage.objects.all().order_by('-created_date')
    serializer_class = PostImageSerializer


class PostImageRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
