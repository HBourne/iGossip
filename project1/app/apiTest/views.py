from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from apiTest.serializers import ApiTestSerializer
from apiTest.models import ApiTest


# Create your views here.
class ApiTestListCreate(generics.ListCreateAPIView):
    queryset = ApiTest.objects.all()
    serializer_class = ApiTestSerializer


def index(request):
    return HttpResponse("Hello, world!")
