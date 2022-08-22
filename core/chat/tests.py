
from django.test import TestCase
from .models import Friend_Request, Chat, Message
from chat_auth.models import User

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


# Create your tests here.
class ChatModelsTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user1 =User.objects.create_user(username="Filip",email="filip@onet.pl", password="test123123!")
        user2= User.objects.create_user(username="Jan",email="jan@onet.pl", password="test123123!")



        chat = Chat.objects.create() 
        chat.users.add(user1)
        chat.users.add(user2)
        chat.save()

        Message.objects.create(chat=chat, author=user1, content="TeSt")

    def test_friend_request_model_create(self):
        user1 = User.objects.all().get(id=1)
        user2 = User.objects.all().get(id=2)
        friend_request = Friend_Request.objects.create(from_user=user1, to_user=user2) 
        self.assertEqual(friend_request.from_user,user1)
        self.assertEqual(friend_request.to_user,user2)

    def test_chat_model_create(self):
        user1 = User.objects.all().get(id=1)
        user2 = User.objects.all().get(id=2)
        chat = Chat.objects.all().get(pk=1)

        self.assertEqual(chat.users.get(pk=user1.pk),user1)
        self.assertEqual(chat.users.get(pk=user2.pk),user2)
        
    def test_message_model_create(self):
        message = Message.objects.all().get(id=1)
        chat = Chat.objects.all().get(id=1)
        self.assertEqual(message.content, "TeSt")
        self.assertNotEqual(message.content, "TeeSt")
        user1 = User.objects.all().get(pk=1)
        self.assertEqual(user1.message_set.all().get(pk=1).content, "TeSt")
        self.assertEqual(chat.message_set.all().get(pk=1).content, "TeSt")

class ChatViewTest(TestCase):
    def setUp(self):
        self.user1 =User.objects.create_user(username="Filip",email="filip@onet.pl", password="test123123!")
        self.user2= User.objects.create_user(username="Jan",email="jan@onet.pl", password="test123123!")

        self.user3 = User.objects.create_user(username="test",email="test@onet.pl", password="test123123!")
        self.user4 =User.objects.create_user(username="test1",email="test1@onet.pl", password="test123123!")    
  


    def api_client(self):
        print("as")
        user = self.user1
        client = APIClient() 
        refresh = RefreshToken.for_user(user)
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        return client
    
    def api_client2(self):
        user = self.user2
        client = APIClient() 
        refresh = RefreshToken.for_user(user)
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        return client

    def test_friend_list_view(self):
        
        client = self.api_client()
        response = client.get("/chat/friend-list/1")
        self.assertEqual(response.status_code, 200)

    def test_create_friend_request_and_confirm_request_views(self):
        client = self.api_client()
        response = client.post("/chat/add-friend", {"username":"Jan"})
        self.assertEqual(response.status_code,200)

        #Second invitation request to the same user, returns erro 409
        response2 = client.post("/chat/add-friend", {"username":"Jan"})
        self.assertEqual(response2.status_code,409)

        #Accept request
        client2 = self.api_client2()
        response3 = client2.put("/chat/accept-request", {"id":1})
        self.assertEqual(response3.status_code, 200)

        user1 = self.user1
        user2 = self.user1
        chat = Chat.objects.all().get(pk=1)

        self.assertEqual(chat.users.get(pk=user1.pk),user1)
        self.assertEqual(chat.users.get(pk=user2.pk),user2)

    def test_friend_reques_to_and_from_user_list_view(self):
        Friend_Request.objects.create(from_user=self.user1, to_user=self.user2)

        client2 = self.api_client2()
        response = client2.get("/chat/friend-request-to-user")
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.data),1)
        
        client1 = self.api_client()
        response2 = client1.get("/chat/friend-request-from-user")
        self.assertEqual(response2.status_code,200)
        self.assertEqual(len(response2.data),1)
    
    def test_chat_list_view(self):
        user1 = self.user1
        user2 = self.user2
        user3 = self.user3
        chat = Chat.objects.create()
        chat.users.add(user1, user2)

        chat2 = Chat.objects.create()
        chat2.users.add(user1, user3)

        client = self.api_client()
        response = client.get("/chat/chats")
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.data),2)
    
    def test_create_new_chat_view(self):
        pass
        
 
        



