import random

from rest_framework.generics import GenericAPIView
from django.core.mail import send_mail


def code_generator(length=6):
    characters = '0123456789abcdefghijklmnopqrstuvwxyz'
    return ''.join(random.choice(characters) for _ in range(length))


class RegisterView(GenericAPIView):

    def post(self, request, *args, **kwargs):
        code = code_generator()

        send_mail(
            'Welcome to Motion-3',
            f'Welcome to Motion! Your code is: {code}',
            'best.motion.ever.group3@gmail.com',
            ['chrott77@gmail.com'],
            fail_silently=False,
        )
