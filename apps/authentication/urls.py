

from django.urls import path
from .views import login_view, register_user
from django.contrib.auth.views import LogoutView
from . import views
from .views import custom_logout_view


urlpatterns = [
    path('login/', login_view, name="login"),
    path('register/', register_user, name="register"),
    path('logout/', custom_logout_view, name='logout'),
    
   
]
