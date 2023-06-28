from django.urls import path

from user_registration.views import RegisterView, RegisterValidationView

urlpatterns = [

    path('', RegisterView.as_view(), name='register'),
    path('validation/', RegisterValidationView.as_view(), name='register'),
]
