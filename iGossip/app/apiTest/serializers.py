# from rest_framework import serializers
# from apiTest.models import Course,User,Favorite,Session


# # class ApiTestSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = ApiTest
# #         fields = ('id', 'name', 'email', 'message')

# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ('id','name','subject','number','instructor','hash_val')

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         field = ('id','username','password','email','grad_year')

# class FavoriteSerializer(serializers.ModelSerializer):
#     model = Favorite
#     field = ('id','user_id','course_id')

# class SessionSerializer(serializers.ModelSerializer):
#     model = Session
#     field = ('id','user_id','token')