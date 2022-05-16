from genericpath import exists
from rest_framework import generics,status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from chat_auth.models import User

from .models import Friend_Request, Chat
from .serializers import FriendsSerializer, FriendRequestSerializer, ChatSerializer
from .permissions import ConfirmRequestPermission
from .paginations import FriendsPagination



class FriendsListView(generics.ListAPIView): 
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        current_user = get_object_or_404(User, pk=self.kwargs["id"])
        return current_user.friends
    
    def list(self, request, id):
        queryset = self.get_queryset()
        serialzer = FriendsSerializer(queryset, many=True)
        return Response(serialzer.data)
   

class CreateFriendRequest(generics.CreateAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request):
        from_user = self.request.user
        to_user = get_object_or_404(User, username=request.data.get("username"))
        
        if(Friend_Request.objects.filter(from_user=from_user, to_user=to_user).exists() or Friend_Request.objects.filter(from_user=to_user, to_user=from_user).exists()):
            return Response({"STATUS":"Friend request already exists!"},status=status.HTTP_409_CONFLICT)
        if from_user.friends.filter(username=to_user.username):
            print("d")
            return Response({"STATUS":"You are arleady friends!"},status=status.HTTP_409_CONFLICT)
        new_request = Friend_Request(from_user=from_user, to_user=to_user)
        new_request.save()
        serializer = FriendRequestSerializer(new_request, many=False)
        return Response(serializer.data)


class FriendRequesToUsertList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Friend_Request.objects.filter(to_user=user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = FriendRequestSerializer(queryset, many=True)
        return Response(serializer.data)

class FriendRequesFromUsertList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Friend_Request.objects.filter(from_user=user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = FriendRequestSerializer(queryset, many=True)
        return Response(serializer.data)

class ConfirmRequest(generics.UpdateAPIView):
    permission_classes= [ConfirmRequestPermission]

    def get_queryset(self):
        request_id = self.request.data.get("id")
        request = get_object_or_404(Friend_Request, pk=request_id)
        return request
    
    def update(self, request):
        request = self.get_queryset()
        self.check_object_permissions(self.request, request)
        from_user = request.from_user
        to_user = request.to_user

        from_user.friends.add(to_user)
        from_user.save()

        to_user.friends.add(from_user)
        to_user.save()

        if not Chat.objects.all().filter(users=from_user).filter(users=to_user).exists():
            chat = Chat.objects.create()
            chat.users.add(from_user)
            chat.users.add(to_user)
            chat.save()

        request.delete()

        other_requests = Friend_Request.objects.all().filter(to_user=to_user)
        serializer = FriendRequestSerializer(other_requests, many=True)
        return Response(serializer.data)

class ChatsList(generics.ListAPIView):
    def get_queryset(self):
        user = self.request.user
        return Chat.objects.all().filter(users__id = user.id)
    
    def list(self,request):
        queryset = self.get_queryset()
        serializer = ChatSerializer(queryset, many=True)
        return Response(serializer.data)

class SearchFriend(generics.ListAPIView):
    pagination_class = FriendsPagination

    def get_queryset(self):
        user = self.request.user
        username = self.kwargs['username']
        friends_id = user.friends.values_list('id', flat=True)
        return User.objects.all().exclude(pk=user.id).exclude(id__in=friends_id).filter(username__icontains=username)
    
    def list(self,request, username):
        queryset = self.get_queryset() 

        if not queryset.exists():
            print('as')
            return Response({'detail':'Not found any user with that name.'}, status=404)
        serializer = FriendsSerializer(queryset, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)