import json
from django.shortcuts import render
from favorites.models import Favorite
from search.models import Course
from login.models import User
from search.serializers import CourseSerializer
from django.db import connection
from rest_framework import generics
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view


class GetFavorites(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    def get_queryset(self):
        if self.request.method == 'GET':
            username = self.request.GET.get('u', None)
            if username is None:
                return HttpResponse(status = 440)
            sql_query = "SELECT * FROM search_course WHERE id IN (SELECT course_id FROM favorites_favorite JOIN login_user ON favorites_favorite.user_id = login_user.id WHERE username = %s)"
            courses = Course.objects.raw(sql_query,[username])
            return courses

@api_view(['POST'])
def add(request):
    if request.method == 'POST':
        username = request.data.get('username')
        course_id = request.data.get('course_id')
        print(username)
        print(course_id)
        if username is None or course_id is None:
            return HttpResponse(status = 400)
        else:
            cursor = connection.cursor()
            sql_query = "SELECT id FROM login_user WHERE username = %s"
            cursor.execute(sql_query, [username])
            user_id = cursor.fetchall()[0][0]
            sql_query2 = "INSERT INTO favorites_favorite (course_id, user_id)  VALUES (%s,%s)"
            cursor.execute(sql_query2,[course_id, user_id])
            return HttpResponse(status=200)
    return HttpResponse(status=400)

@api_view(['DELETE'])
def delete(request):
    if request.method == "DELETE":
        username = request.data.get('username')
        course_id = request.data.get('course_id')
        if username is None or course_id is None:
            return HttpResponse(status = 400)
        else:
            cursor = connection.cursor()
            sql_query = "SELECT id FROM login_user WHERE username = %s"
            cursor.execute(sql_query, [username])
            user_id = cursor.fetchall()[0][0]
            sql_query2 = "DELETE FROM favorites_favorite WHERE course_id = %s AND user_id = %s"
            cursor.execute(sql_query2,[course_id,user_id])
            return HttpResponse(status=200)

    return HttpResponse(status=400)

@api_view(['GET'])
def check(request):
    print(request.data)
    if request.method == "GET":
        username = request.GET.get('u')
        course_id = request.GET.get('cid')
        if username is None or course_id is None:
            return HttpResponse(status = 400)
        else:
            cursor = connection.cursor()
            sql_query = "SELECT id FROM login_user WHERE username = %s"
            cursor.execute(sql_query, [username])
            user_id = cursor.fetchall()[0][0]
            sql_query2 = "SELECT * FROM favorites_favorite WHERE user_id = %s AND course_id = %s"
            cursor.execute(sql_query2,[user_id,course_id])
            favorite = cursor.fetchall()
            flag = True
            if len(favorite) == 0:
                flag = False
            return JsonResponse({
                'favorite': flag,
                'status': 200
            })
            
    else:
        return HttpResponse(status = 400)


