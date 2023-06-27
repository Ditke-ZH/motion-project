from django.urls import path

from friendrequest.views import FriendsListView, FriendrequestPostView, FriendrequestGetPatchDeleteView, \
    FriendrequestListView

urlpatterns = [

    path('', FriendsListView.as_view(), name='friends-list'),
    path('request/<int:user_id>/', FriendrequestPostView.as_view(), name='friendrequest-post'),
    path('requests/', FriendrequestListView.as_view(), name='friendrequest-retrieve-update-delete'),
    path('requests/<int:id>/', FriendrequestGetPatchDeleteView.as_view(),
         name='friendrequest-retrieve-update-delete'),

]
