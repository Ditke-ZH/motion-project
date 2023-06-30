from rest_framework import permissions


class ObjNotLoggedInUser(permissions.BasePermission):
    message = "you cant follow yourself, its dangerous"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj != request.user
