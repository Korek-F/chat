from rest_framework import serializers
from chat_auth.models import User
from .models import Friend_Request

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ("id","email","username")

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = FriendsSerializer(many=False)
    to_user = FriendsSerializer(many=False)
    class Meta:
        model = Friend_Request
        fields = ("id","from_user","to_user","creation_date")

"""
class FriendRequestsToUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Friend_Request
        fields = ("id","from_user","to_user","creation_date")
        """