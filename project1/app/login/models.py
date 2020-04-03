from django.db import models

class User(models.Model):
    username = models.CharField(max_length = 30)
    password = models.CharField(max_length = 256)
    email = models.EmailField()
    grad_year = models.IntegerField()
    major = models.CharField(max_length = 100)

    def __str__(self):
        return self.name
