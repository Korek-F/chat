from django.db import models
from chat_auth.models import User
# Create your models here.
class Friend_Request(models.Model):
    from_user = models.ForeignKey(User, related_name="from_user", on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name="to_user", on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.from_user)+" TO "+str(self.to_user)

class Chat(models.Model):
    users = models.ManyToManyField(User, related_name="users")
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "CHAT "+str(self.creation_date)