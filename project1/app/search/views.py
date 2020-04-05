from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from search.serializers import CourseSerializer
from search.models import Course
from rest_framework import filters
from rest_framework import viewsets
from django.db.models import Q
from django.db import connection
from django.http import JsonResponse


class CourseListGeneralSearch(generics.ListCreateAPIView):
      serializer_class = CourseSerializer
      def get_queryset(self):
        if self.request.method == 'GET':
            queryset = Course.objects.all()
            query = self.request.GET.get('string', None)
            if query is None:
                 sql_query = "SELECT * FROM apiTest_course"
                 return Courses.objects.raw(sql_query)
            if query.isdigit():
                  sql_query = "SELECT * FROM apiTest_course WHERE number = %s"
                  courses = Course.objects.raw(sql_query,[query])
                  return courses

            query = '%'+query+'%'
            sql_query = "SELECT * FROM apiTest_course WHERE name LIKE %s UNION SELECT * FROM apiTest_course WHERE instructor LIKE %s UNION SELECT * FROM apiTest_course WHERE subject LIKE %s;"
            courses = Course.objects.raw(sql_query,[query, query, query])
            return courses


