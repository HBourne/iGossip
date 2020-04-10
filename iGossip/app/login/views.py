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
        username = request.session['username']
        return HttpResponse(username, status=200)

    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')

        if username and password:
            try:
                user = models.User.objects.get(username=username)
            except:
                message = 'The username you entered does not exist！'
                return HttpResponse(message, status=401)
            
            if hash_code(password) == user.password:
            # if password == user.password:
                request.session['is_loggedin'] = True
                request.session['username'] = user.username
                message = "Welcome!"
                return HttpResponse(message, status=200)
            else:
                message = 'The username or password you entered might be incorrect.'
                return HttpResponse(message, status=401)   

    return HttpResponse(status=400)
    

@api_view(['POST'])
def logout(request):
    if not request.session.get('is_loggedin', None):
        return HttpResponse(status=200)         
    request.session.flush()
    return HttpResponse(status=200)    


@api_view(['POST'])
def register(request):
    if request.session.get('is_loggedin', None) and request.session['username'] == request.data.get('username') :
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

@api_view(['POST'])
def update_user_info(request):
    if request.session.get('is_loggedin', None):
        if request.method == 'POST':    
            username = request.session['username']
            email = request.data.get('email')
            grad_year = request.data.get('grad_year')
            major = request.data.get('major')
            bio = request.data.get('bio')

            user = models.User.objects.get(username=username)
            if email != user.email:
                user.email = email
            if grad_year != user.grad_year:
                user.grad_year = grad_year
            if major != user.major:
                user.major = major
            if bio != user.bio:
                user.bio = bio
            user.save()

            return HttpResponse(status=200)
    return HttpResponse(status=401)

def get_user_info(request):
    if request.session.get('is_loggedin', None):
        if request.method == 'GET':
            username = request.session['username']
            user = models.User.objects.get(username=username)
            response = HttpResponse(status=200)
            response['username'] = username
            response['email'] = user.email
            response['major'] = user.major
            response['grad_year'] = user.grad_year
            response['bio'] = user.bio
            return response
    return HttpResponse(status=401)