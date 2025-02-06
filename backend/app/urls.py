from django.urls import path
from . import views

# Define the URL route for your view
urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('test/', views.my_view, name='idk'),
    
    
    #CRUD
    path('get_building/<str:building_name>/', views.get_building, name = "get_building"),
    path('create_building/', views.create_building, name="create_building"),
    path('delete_building/<str:building_name>/', views.delete_building, name="delete_building"),
    path('update_building/<str:building_name>/', views.update_building, name="update_building"),
    
    path('get_building_coordinates/<str:building_name>/', views.get_building_coordinates, name="get_building_coordinates"),
]
