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
from django.http import HttpResponse


class CourseListGeneralSearch(generics.ListCreateAPIView):
      serializer_class = CourseSerializer
      def get_queryset(self):
            if self.request.method == 'GET':
                  queryset = Course.objects.all()
                  query = self.request.GET.get('string', None)
                  if query is None:
                        sql_query = "SELECT * FROM search_course"
                        return Course.objects.raw(sql_query)
                  if query.isdigit():
                        sql_query = "SELECT * FROM search_course WHERE number = %s"
                        courses = Course.objects.raw(sql_query,[query])
                        return courses
                  if len(query) == 5 and query[2:].isdigit():
                        sql_query = "SELECT * FROM search_course WHERE number = %s AND subject = '\'%s\''"
                        courses = Course.objects.raw(sql_query,[query[2:], query[:2]])
                        return courses

                  query = '%'+query+'%'
                  sql_query = "SELECT * FROM search_course WHERE name LIKE %s UNION SELECT * FROM search_course WHERE instructor LIKE %s UNION SELECT * FROM search_course WHERE subject LIKE %s;"
                  courses = Course.objects.raw(sql_query,[query, query, query])
                  return courses

class SingleCourse(generics.ListCreateAPIView):
      serializer_class = CourseSerializer
      def get_queryset(self):
            if self.request.method == 'GET':
                  cid = self.request.GET.get('cid',None)
                  sql_query = "SELECT * FROM search_course WHERE id = %s"
                  course = Course.objects.raw(sql_query,[cid])
                  return course
