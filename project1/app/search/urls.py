from django.urls import path

from . import views

urlpatterns = [
    path('api/search/', views.CourseListGeneralSearch.as_view()),
    path('api/search/single/', views.SingleCourse.as_view())
    
]
