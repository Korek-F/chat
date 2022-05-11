
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Chat, Message
from core import settings
import jwt
from chat_auth.models import User
import datetime
class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = 'chat_%s' % self.chat_id
        self.user = None
        self.user_id = None
        
        try:
            query = self.scope["query_string"]
            if(query):
                query = query.decode()
            if(query):
                query = query.split('=')
                if(query[0] == 'token'):
                    self.token = query[1]
            decoded_token = jwt.decode(self.token, settings.SECRET_KEY, algorithms=['HS256'])
            self.user_id = decoded_token["user_id"]
        except:
            await self.disconnect(403)
        
        await self.get_user(self.user_id)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.send_message(await self.fetch_messages())

        if not (await self.check_user()):
            await self.disconnect(403)
        
        await self.get_user(self.user_id)

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.chat_id
        )
    

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
  
        message = text_data_json['message']

        new_message = await self.write_message(text=message)

        await self.channel_layer.group_send(
            self.room_group_name,{
                'type':'chat_message',
                'message': self.message_to_json(new_message) 
            }
        )
    @database_sync_to_async
    def write_message(self, text):
        chat = Chat.objects.all().get(pk=self.chat_id)
        chat.last_active = datetime.datetime.now()
        chat.save()
        new_message = Message(content = text, chat=chat, author=self.user)
        new_message.save()
        return new_message

    @database_sync_to_async
    def get_user(self, user_id):
        self.user = User.objects.all().get(pk=user_id)
        


    @database_sync_to_async
    def check_user(self):
        chat = Chat.objects.all().get(pk=self.chat_id)
        return chat.users.filter(pk=self.user.id).exists()

    @database_sync_to_async
    def fetch_messages(self):
        results = []
        chat = Chat.objects.all().get(pk=self.chat_id)
        for message in chat.message_set.all():
            results.append(self.message_to_json(message))
        return results

    def message_to_json(self, message):
        return {
            'id':message.id,
            'author_username':message.author.username,
            'author_id':message.author.id,
            'date':message.creation_date.strftime("%Y-%m-%d %H:%M:%S"),
            'content':message.content
        }

    async def chat_message(self, event):
        message= event['message']

        await self.send(text_data=json.dumps({
            'message':message
        }))

    async def send_message(self, message):
        await self.send(text_data=json.dumps(message))