from django.contrib import admin
from .models import Friend_Request, Chat, Message
# Register your models here.
admin.site.register(Friend_Request)
admin.site.register(Chat)
admin.site.register(Message)