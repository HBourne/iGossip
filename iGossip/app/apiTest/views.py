# from django.shortcuts import render
# from django.http import HttpResponse
# from rest_framework import generics
# from apiTest.serializers import CourseSerializer, UserSerializer
# from apiTest.models import Course, User
# from rest_framework import filters
# from rest_framework import viewsets
# from django.db.models import Q
# from django.db import connection
# from django.http import JsonResponse



# # class CourseListSearchByField(generics.ListCreateAPIView):
# #       serializer_class = CourseSerializer
      
# #       def get_queryset(self):
# #         if self.request.method == 'GET':
# #             queryset = Course.objects.all()
# #             curr_id = self.request.GET.get('id',None)
# #             if curr_id is not None:
# #                 queryset = queryset.filter(id = curr_id)
# #                 return queryset
# #             else:    
# #                 curr_name = self.request.GET.get('name', None)
# #                 curr_number = self.request.GET.get('number',None)
# #                 curr_instructor = self.request.GET.get('instructor',None)
# #                 if curr_name is not None:
# #                     queryset = queryset.filter(name = curr_name)
# #                 if curr_number is not None:
# #                     queryset = queryset.filter(number = curr_number )
# #                 if curr_instructor is not None:
# #                     queryset = queryset.filter(instructor = curr_instructor)
# #                 return queryset

# # class CourseListGeneralSearchORM(generics.ListCreateAPIView):
# #     serializer_class = CourseSerializer
# #     def get_queryset(self):
# #         if self.request.method == 'GET':
# #             queryset = Course.objects.all()
# #             query = self.request.GET.get('string', None)
# #             if query is None:
# #                 return queryset
# #             if query.isdigit():
# #                 queryset = queryset.filter(number = query)
# #                 return queryset
# #             lookups = Q(name__icontains = query) | Q(instructor__icontains=query) | Q(subject__icontains = query)
# #             queryset = queryset.filter(lookups)
# #             return queryset
           

# class CourseListGeneralSearch(generics.ListCreateAPIView):
#       serializer_class = CourseSerializer
#       def get_queryset(self):
#         if self.request.method == 'GET':
#             queryset = Course.objects.all()
#             query = self.request.GET.get('string', None)
#             if query is None:
#                  sql_query = "SELECT * FROM apiTest_course"
#                  return Courses.objects.raw(sql_query)
#             if query.isdigit():
#                   sql_query = "SELECT * FROM apiTest_course WHERE number = %s"
#                   courses = Course.objects.raw(sql_query,[query])
#                   return courses

#             query = '%'+query+'%'
#             sql_query = "SELECT * FROM apiTest_course WHERE name LIKE %s UNION SELECT * FROM apiTest_course WHERE instructor LIKE %s UNION SELECT * FROM apiTest_course WHERE subject LIKE %s;"
#             courses = Course.objects.raw(sql_query,[query, query, query])
#             return courses




    