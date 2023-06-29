from django.urls import path

from user.views import ViewAllUsers, ViewOneUser, RetrieveUpdateDestroyLoggedInUser

urlpatterns = [
    path('', ViewAllUsers.as_view()),
    path('<int:id>/', ViewOneUser.as_view()),

    path('me/', RetrieveUpdateDestroyLoggedInUser.as_view())
]
