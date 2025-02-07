from django.urls import path
from django.shortcuts import render
from .views import building, campus, floor, pointOfInterest, room, userg
import json

# Define the URL route for your view
urlpatterns = [
    

    #Building
    path('building_get/<str:building_name>/', building.building_get, name = "get_building"),
    path('building_create/', building.building_create, name="create_building"),
    path('building_delete/<str:building_name>/', building.building_delete, name="delete_building"),
    path('building_update/<str:building_name>/', building.building_update, name="update_building"),
    
   # path('get_building_coordinates/<str:building_name>/', views.get_building_coordinates, name="get_building_coordinates"),
]
