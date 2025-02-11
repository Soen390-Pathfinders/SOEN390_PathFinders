from django.urls import path
from django.shortcuts import render
from .views import building, campus, floor, pointOfInterest, room, user, types
import json

# Define the URL route for your view
urlpatterns = [

    #Building
    path('building/all', building.get_all_buildings, name = "get_all_buildings"),
    path('building/get', building.get_building, name = "get_building"),
    path('building/add', building.add_building, name="add_building"),
    path('building/remove', building.remove_building, name="remove_building"),
    path('building/modify', building.modify_building, name="modify_building"),
    
    path('campus/all', campus.get_all_campuses, name='get_all_campuses'),
    path('campus/get', campus.get_campus, name='get_campus'),
    path('campus/add', campus.add_campus, name='add_campus'),
    path('campus/remove', campus.remove_campus, name='remove_campus'),
    path('campus/modify', campus.modify_campus, name='modify_campus'),

    path('floor/all', floor.get_all_floors, name='get_all_floors'),
    path('floor/get', floor.get_all_floors, name='get_floor'),
    path('floor/add', floor.get_all_floors, name='add_floor'),
    path('floor/remove', floor.get_all_floors, name='remove_floor'),
    path('floor/modify', floor.get_all_floors, name='modify_floor'),

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
    
    
    path('roomType/all', types.get_all_roomType, name='get_all_roomType'),
    path('roomType/get', types.get_roomType, name='get_roomType'),
    path('roomType/add', types.add_roomType, name='add_roomType'),
    path('roomType/remove', types.remove_roomType, name='remove_roomType'),
    path('roomType/modify', types.modify_roomType, name='modify_roomType'),
    
    path('amenityType/all', types.get_all_amenityType, name='get_all_amenityType'),
    path('amenityType/get', types.get_amenityType, name='get_amenityType'),
    path('amenityType/add', types.add_amenityType, name='add_amenityType'),
    path('amenityType/remove', types.remove_amenityType, name='remove_amenityType'),
    path('amenityType/modify', types.modify_amenityType, name='modify_amenityType'),
    
   # path('get_building_coordinates/<str:building_name>/', views.get_building_coordinates, name="get_building_coordinates"),
]
