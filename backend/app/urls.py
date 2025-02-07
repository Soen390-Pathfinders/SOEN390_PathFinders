from django.urls import path
from django.shortcuts import render
from .views import building, campus, floor, pointOfInterest, room, user
import json

# Define the URL route for your view
urlpatterns = [
    

    #Building
    path('building_get/', building.building_list, name = "building_list"),
    path('building_get/<str:building_name>/', building.building_get, name = "building_get"),
    path('building_create/', building.building_create, name="building_create"),
    path('building_delete/<str:building_name>/', building.building_delete, name="building_delete"),
    path('building_update/<str:building_name>/', building.building_update, name="building_update"),
    
    path('campus/', campus.campus_list, name='campus_list'),
    path('campus/<int:pk>/', campus.campus_get, name='campus_get'),
    path('campus_create/', campus.campus_create, name='campus_create'),
    path('campus_delete/<int:pk>/', campus.campus_delete, name='campus_delete'),
    path('campus_update/<int:pk>/', campus.campus_update, name='campus_update'),

    path('floor/', floor.floor_list, name='floor_list'),
    path('floor/<int:pk>/', floor.floor_detail, name='floor_detail'),
    path('floor/create/', floor.floor_create, name='floor_create'),
    path('floor/<int:pk>/update/', floor.floor_update, name='floor_update'),
    path('floor/<int:pk>/delete/', floor.floor_delete, name='floor_delete'),

    path('pointOfInterest/', pointOfInterest.pointOfInterest_list, name='pointOfInterest_list'),  
    path('pointOfInterest/<int:pk>/', pointOfInterest.pointOfInterest_get, name='pointOfInterest_get'),  
    path('pointOfInterest_create/', pointOfInterest.pointOfInterest_create, name='pointOfInterest_create'),  
    path('pointOfInterest_delete/<int:pk>/', pointOfInterest.pointOfInterest_delete, name='pointOfInterest_delete'),  
    path('pointOfInterest_update/<int:pk>/', pointOfInterest.pointOfInterest_update, name='pointOfInterest_update'),  

    path('room/', room.room_list, name='room_list'),
    path('room/<int:pk>/', room.room_detail, name='room_detail'),
    path('room/create/', room.room_create, name='room_create'),
    path('room/<int:pk>/update/', room.room_update, name='room_update'),
    path('room/<int:pk>/delete/', room.room_delete, name='room_delete'),

    path('user/', user.user_list, name='user_list'),
    path('user/<int:pk>/', user.user_get, name='user_get'),
    path('user_create/', user.user_create, name='user_create'),
    path('user_delete/<int:pk>/', user.user_delete, name='user_delete'),
    path('user_update/<int:pk>/', user.user_update, name='user_update'),
   # path('get_building_coordinates/<str:building_name>/', views.get_building_coordinates, name="get_building_coordinates"),
]
