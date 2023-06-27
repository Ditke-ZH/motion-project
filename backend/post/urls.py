from django.urls import path
from .views import PostListCreateView, PostSearchView, PostRetrieveUpdateDeleteView, UserPostListView, \
    FollowingPostListView, FriendsPostListView, PostToggleLikeView, UserLikedPostListView


urlpatterns = [

    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('?search=<str:search_string>', PostSearchView.as_view(), name='post-search'),
    path('<int:post_id>/', PostRetrieveUpdateDeleteView.as_view(), name='post-retrieve-update-delete'),
    path('user/<int:user_id>/', UserPostListView.as_view(), name='user-post-list'),
    path('following/', FollowingPostListView.as_view(), name='following-post-list'),
    path('friends/', FriendsPostListView.as_view(), name='friends-post-list'),
    path('toggle-like/<int:post_id>/', PostToggleLikeView.as_view(), name='post-toggle-like'),
    path('likes/', UserLikedPostListView.as_view(), name='user-liked-post-list'),

]
