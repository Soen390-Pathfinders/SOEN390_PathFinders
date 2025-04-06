from .. import models  # TODO: Replace wildcard import with only the used models
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
import json

def user_list(request): 
    # TODO: This function will return a list of all users (to be implemented)
    pass

def user_get(request, pk): 
    # TODO: This function will retrieve a user by primary key (to be implemented)
    pass

def user_create(request): 
    # TODO: This function will handle creation of new users (to be implemented)
    pass

def user_delete(request, pk): 
    # TODO: This function will handle deletion of users (to be implemented)
    pass

def user_update(request, pk): 
    # TODO: This function will handle updating user information (to be implemented)
    pass
