from django.urls import path
from . import views

urlpatterns = [
    path('friend-list/<int:id>', views.FriendsListView.as_view(),name="friend_list"),
    path('add-friend', views.CreateFriendRequest.as_view(),name="add_friend"),
    path('friend-request-to-user', views.FriendRequesToUsertList.as_view(),name="friend_request_to_user"),
    path('friend-request-from-user', views.FriendRequesFromUsertList.as_view(),name="friend_request_from_user"),
    path('accept-request', views.ConfirmRequest.as_view(),name="accept_request"),
]
