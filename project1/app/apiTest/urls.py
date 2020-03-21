from django.urls import path

from . import views

urlpatterns = [
    path('courses/search/', views.CourseListGeneralSearch.as_view()),
    
]
