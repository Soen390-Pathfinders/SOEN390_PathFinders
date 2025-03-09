from django.urls import path
from django.shortcuts import render
from .views import building, campus, floor, insidepoi, room, user, edge, djikstra
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
    path('floor/get', floor.get_floor, name='get_floor'),
    path('floor/add', floor.add_floor, name='add_floor'),
    path('floor/remove', floor.remove_floor, name='remove_floor'),
    path('floor/modify', floor.modify_floor, name='modify_floor'),

    path('poi/inside/all', insidepoi.get_all_insidepois, name='get_all_insidepois'),  
    path('poi/inside/get', insidepoi.get_insidepoi, name='get_insidepoi'),  
    path('poi/inside/add', insidepoi.add_insidepoi, name='add_insidepoi'),  
    path('poi/inside/remove', insidepoi.remove_insidepoi, name='remove_insidepoi'),  
    path('poi/inside/modify', insidepoi.modify_insidepoi, name='modify_insidepoi'),  

    path('room/all', room.get_all_rooms, name='get_all_rooms'),
    path('room/get', room.get_room, name='get_room'),
    path('room/add', room.add_room, name='add_room'),
    path('room/remove', room.remove_room, name='remove_room'),
    path('room/modify', room.modify_room, name='modify_room'),

     path('edge/all', edge.get_all_edges, name='get_all_edges'),
     path('path/rooms', djikstra.get_shortest_path_between_rooms, name='get_shortest_path_between_rooms'),
     path('path/rooms/accessible', djikstra.get_accessible_path_between_rooms, name='get_accessible_path_between_rooms'),
     path("floor/amenities", djikstra.get_amenities_by_floor, name="get_amenities_by_floor"),

    path('user/', user.user_list, name='user_list'),
    path('user/<int:pk>/', user.user_get, name='user_get'),
    path('user_create/', user.user_create, name='user_create'),
    path('user_delete/<int:pk>/', user.user_delete, name='user_delete'),
    path('user_update/<int:pk>/', user.user_update, name='user_update'),
    
   # path('get_building_coordinates/<str:building_name>/', views.get_building_coordinates, name="get_building_coordinates"),
]
