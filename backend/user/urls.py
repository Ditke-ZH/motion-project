from django.urls import path

from .views import ViewAllFollowing, ViewAllUsers, ToggleFollowing, ViewAllFollowers, ViewOneUser

urlpatterns = [
    path('', ViewAllUsers.as_view()),
    path('<int:id>/', ViewOneUser.as_view()),

    path('toggle-follow/<int:id>/', ToggleFollowing.as_view()),

    path('following/', ViewAllFollowing.as_view()),
    path('followers/', ViewAllFollowers.as_view()),
]
