from django.urls import path

from user.views import ViewAllFollowing, ToggleFollowing, ViewAllFollowers

urlpatterns = [
    path('toggle-follow/<int:id>/', ToggleFollowing.as_view()),

    path('following/', ViewAllFollowing.as_view()),
    path('followers/', ViewAllFollowers.as_view())
]
