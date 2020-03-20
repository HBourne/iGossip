from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from apiTest.serializers import CourseSerializer
from apiTest.models import Course
from rest_framework import filters
from rest_framework import viewsets


class CourseListFilter(generics.ListCreateAPIView):
      serializer_class = CourseSerializer
      
      def get_queryset(self):
        if self.request.method == 'GET':
            queryset = Course.objects.all()
            curr_id = self.request.GET.get('id',None)
            if curr_id is not None:
                queryset = queryset.filter(id = curr_id)
                return queryset
            else:    
                curr_name = self.request.GET.get('name', None)
                curr_number = self.request.GET.get('number',None)
                curr_instructor = self.request.GET.get('instructor',None)
                if curr_name is not None:
                    queryset = queryset.filter(name = curr_name)
                if curr_number is not None:
                    queryset = queryset.filter(number = curr_number )
                if curr_instructor is not None:
                    queryset = queryset.filter(instructor = curr_instructor)
                return queryset

def index(request):
    return HttpResponse("Hello, world!")
