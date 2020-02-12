from rest_framework import serializers
from apiTest.models import ApiTest


class ApiTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiTest
        fields = ('id', 'name', 'email', 'message')
