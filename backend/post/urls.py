from django.urls import path
from .views import PostListCreateView, PostSearchView, PostRetrieveUpdateDeleteView, UserPostListView, \
    FollowingPostListView, FriendsPostListView, PostToggleLikeView, UserLikedPostListView


urlpatterns = [

    path('social/posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('social/posts/?search=<str:search_string>', PostSearchView.as_view(), name='post-search'),
    path('social/posts/<int:post_id>/', PostRetrieveUpdateDeleteView.as_view(), name='post-retrieve-update-delete'),
    path('social/posts/user/<int:user_id>/', UserPostListView.as_view(), name='user-post-list'),
    path('social/posts/following/', FollowingPostListView.as_view(), name='following-post-list'),
    path('social/posts/friends/', FriendsPostListView.as_view(), name='friends-post-list'),
    path('social/posts/toggle-like/<int:post_id>/', PostToggleLikeView.as_view(), name='post-toggle-like'),
    path('social/posts/likes/', UserLikedPostListView.as_view(), name='user-liked-post-list'),

]
