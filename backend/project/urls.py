"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [

    # Admin page
    path('backend/admin/', admin.site.urls),

    # registration & authentication
    path('backend/api/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh'),

    # path('backend/api/registration/', include('')),
    # path('backend/api/password-reset/', include('')),

    # API urls
    path('backend/api/users/', include('user.urls')),
    path('backend/api/social/posts/', include('post.urls')),
    path('backend/api/social/comments/', include('comment.urls')),
    path('backend/api/social/followers/', include('user.urls')),
    path('backend/api/social/friends/', include('friendrequest.urls')),
]
