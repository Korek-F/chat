from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('api/token/', views.UserTokenObtainPairView.as_view(),
     name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('registration', views.CreateUserView.as_view(), name="registration")
]