from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from backend.user.serializers import UserSerializer

User = get_user_model()


class CreateUserAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        extra_kwargs = {}
        extra_data = serializer.initial_data.get('extra_data')
        if extra_data:
            extra_kwargs['extra_data'] = extra_data
        serializer.save(**extra_kwargs)
