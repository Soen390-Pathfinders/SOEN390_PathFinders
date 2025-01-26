from django.urls import path
from . import views

# Define the URL route for your view
urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path('test/', views.my_view, name='idk')
]
