from django.db import models

# Create your models here.

class Course(models.Model):
    name = models.CharField(max_length = 100)
    subject = models.CharField(max_length = 10)
    number = models.IntegerField()
    instructor = models.CharField(max_length = 100)
    hash_val = models.CharField(max_length = 100)
