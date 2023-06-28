import random

from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from user_registration.models import UserRegistration
from user_registration.serializers import UserRegistrationSerializer, UserRegistrationValidationSerializer

User = get_user_model()


def code_generator(length=6):
    characters = '0123456789abcdefghijklmnopqrstuvwxyz'
    return ''.join(random.choice(characters) for _ in range(length))


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        code = code_generator()
        email = request.data['email']

        # create new user
        data = request.data
        data['username'] = request.data['email']
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = User.objects.last()

        # create user_registration
        reg_instance = UserRegistration.objects.all()
        reg_instance.create(code=code, user_id=user.id)

        # send code via mail
        send_mail(
            'Welcome to Motion-3',
            f'Welcome to Motion!\n\n Your code is: \n-->  {code}  <--',
            'best.motion.ever.group3@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response(status=status.HTTP_201_CREATED)


class RegisterValidationView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationValidationSerializer

    def patch(self, request, *args, **kwargs):
        user_instance = get_object_or_404(User, email=request.data['email'])
        if request.data['code'] == user_instance.user_registration.code \
                and request.data['password'] == request.data['password_repeat']:
            data = request.data
            data['password'] = make_password(data['password'])
            user_serializer = self.get_serializer(user_instance, data=data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            return Response(user_serializer.data)
        else:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)
