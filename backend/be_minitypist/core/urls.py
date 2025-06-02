from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("test/", views.test_view),
    path("signup/", views.signup),
    path("login/", views.CustomTokenObtainPairView.as_view(), name='login')
]