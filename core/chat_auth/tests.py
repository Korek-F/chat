from urllib import response
from django.test import TestCase

from .models import User
# Create your tests here.

class UserModelTestCase(TestCase):
    
    def create_user(self, username="John", email="john@onetto.pl", password="testpassword123"):
        return User.objects.create_user(username=username, email=email, password=password)

    def test_user_creation(self):
        user = self.create_user()
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.__str__(), user.email)

class UserViewTest(TestCase):

    def create_user(self, username="John", email="john@onetto.pl", password="testpassword123"):
        return User.objects.create_user(username=username, email=email, password=password)

    def test_registration_view(self):
        response = self.client.post("/auth/registration"
        ,{"username":"Jack","email":"jack@com.pl","password":"passwordtest123" })
        self.assertEqual(response.status_code, 201)
        user = User.objects.all().get(username="Jack")
        self.assertEqual(user.email, "jack@com.pl")

    def test_login_jwt_view(self):
        self.create_user()
        response = self.client.post("/auth/api/token/"
        ,{"email":"john@onetto.pl","password":"testpassword123" })
        self.assertEqual(response.status_code, 200)