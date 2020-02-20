from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from apiTest.serializers import ApiTestSerializer
from apiTest.models import ApiTest
from rest_framework import filters

# Create your views here.
class ApiTestListCreate(generics.ListCreateAPIView):
    queryset = ApiTest.objects.all()
    serializer_class = ApiTestSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name','email','message','created_at']

  

def index(request):
    return HttpResponse("Hello, world!")
