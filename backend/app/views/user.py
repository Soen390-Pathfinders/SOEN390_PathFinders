from ..models import User
from ..serializers import UserSerializer  # Import the serializer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.core import serializers
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from social_django.utils import load_strategy, load_backend
from social_core.actions import do_complete

def user_list(request):
    users = User.objects.all()
    data = serializers.serialize('json', users)
    return JsonResponse(data, safe=False)

def user_get(request, pk):
    user = get_object_or_404(User, pk=pk)
    data = serializers.serialize('json', [user])
    return JsonResponse(data, safe=False)

def user_create(request):
    data = json.loads(request.body)
    user = User.objects.create(**data)
    return JsonResponse({"message": "User created successfully", "user": user.username})

def user_delete(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return JsonResponse({"message": "User deleted successfully"})

def user_update(request, pk):
    user = get_object_or_404(User, pk=pk)
    data = json.loads(request.body)
    for key, value in data.items():
        setattr(user, key, value)
    user.save()
    return JsonResponse({"message": "User updated successfully"})


# Google OAuth Views

class GoogleLogin(APIView):
    def get(self, request):
        backend = load_backend(load_strategy(request), 'google-oauth2', redirect_uri=None)
        return redirect(backend.auth_url())

class GoogleCallback(APIView):
    def get(self, request):
        user = do_complete('google-oauth2', request)
        if user:
            # Check if user already exists
            user_obj, created = User.objects.get_or_create(
                email=user.email,
                defaults={
                    'username': user.username,
                    'google_id': user.social_user.uid,
                }
            )
            if not created:
                # Update existing user with latest info
                user_obj.google_id = user.social_user.uid
                user_obj.username = user.username
                user_obj.save()

            # Serialize and return user data
            serializer = UserSerializer(user_obj)
            return Response({"message": "Logged in successfully", "user": serializer.data})

        return Response({"error": "Invalid credentials"}, status=401)