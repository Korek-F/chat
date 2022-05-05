from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .serializers import UserRegisterSerializer

# Create your views here.
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = user.id
        token['user_email'] = user.email
        return token


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer