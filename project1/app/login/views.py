from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from . import models
import hashlib

def hash_code(s, salt='cs241'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()


@api_view(['POST'])
def login(request):
    if request.session.get('is_loggedin', None):  
        return HttpResponse(status=200)

    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')

        if username and password:
            try:
                user = models.User.objects.get(username=username)
            except:
                message = 'Non-existing user！'
                return HttpResponse(message, status=401)
            
            if hash_code(password) == user.password:
            # if password == user.password:
                request.session['is_loggedin'] = True
                request.session['username'] = user.username
                message = "successfully logged in!"
                return HttpResponse(message, status=200)
            else:
                message = 'do not match!'
                return HttpResponse(message, status=401)   

    return HttpResponse(status=400)
    

def logout(request):
    if not request.session.get('is_loggedin', None):
        return HttpResponse(status=200)         
    request.session.flush()
    return HttpResponse(status=200)    


@api_view(['POST'])
def register(request):
    if request.session.get('is_login', None):
        return HttpResponse(status=200)  

    if request.method == 'POST':
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        grad_year = request.data.get('gradYear')
        major = request.data.get('major')

        duplicate_user = models.User.objects.filter(username=username)
        if duplicate_user:
            message = 'This username has been occupied!'
            return HttpResponse(message, status=401)

        duplicate_email = models.User.objects.filter(email=email)
        if duplicate_email:
            message = 'This email has been used!'
            return HttpResponse(message, status=401)

        new_user = models.User()
        new_user.email = email
        new_user.username = username
        new_user.password = hash_code(password)
        # new_user.password = password
        # print(len(new_user.password))
        new_user.grad_year = grad_year
        new_user.major = major
        new_user.save()

        request.session['is_loggedin'] = True
        request.session['username'] = username
        return HttpResponse(status=200)

    return HttpResponse(status=400)