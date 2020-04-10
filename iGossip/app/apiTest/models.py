from django.db import models

# Create your models here.


# class ApiTest(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     message = models.CharField(max_length=300)
#     created_at = models.DateTimeField(auto_now_add=True)

# class Course(models.Model):
#     name = models.CharField(max_length = 100)
#     subject = models.CharField(max_length = 10)
#     number = models.IntegerField()
#     instructor = models.CharField(max_length = 100)
#     hash_val = models.CharField(max_length = 100)
  
# class User(models.Model):
#     username = models.CharField(max_length = 30)
#     password = models.CharField(max_length = 50)
#     email = models.EmailField()
#     grad_year = models.IntegerField()
#     major = models.CharField(max_length = 100)

# class Favorite(models.Model):
#     user = models.ForeignKey(User, on_delete = models.CASCADE)
#     course = models.ForeignKey(Course, on_delete= models.CASCADE)

# class Session(models.Model):
#     user = models.ForeignKey(User, on_delete = models.CASCADE)
#     token = models.CharField(max_length = 100)