from django.urls import path, include
from . import views

urlpatterns = [
    path('auth/', views.login),
    path('quit/', views.logout),
    path('join/', views.register),
    path('getuserinfo/', views.get_user_info),
    path('updateuserinfo/', views.update_user_info),
]       