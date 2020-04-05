from rest_framework import serializers
from search.models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id','name','subject','number','instructor','hash_val')