from django.urls import path

from . import views

urlpatterns = [
    path('favorites/get/', views.GetFavorites.as_view()),
    path('favorites/add/', views.add),
    path('favorites/check/',views.check),
    path('favorites/delete/',views.delete)
]
