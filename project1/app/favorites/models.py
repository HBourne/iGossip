from django.db import models
from search.models import Course
from login.models import User


# Create your models here.

class Favorite(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

