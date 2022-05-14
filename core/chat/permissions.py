from rest_framework import permissions 

class ConfirmRequestPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user)
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        print(obj)
        return obj.to_user.id == request.user.id