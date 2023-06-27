from django.urls import path

from user_registration.views import RegisterView

urlpatterns = [

    path('', RegisterView.as_view(), name='register'),
]
