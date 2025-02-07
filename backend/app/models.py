from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractUser, Group, Permission 

from jsonschema import validate, ValidationError
from datetime import time

class Campus(models.Model):
    campus_id = models.AutoField(primary_key =True)
    campus_name = models.CharField(max_length = 255, default="")
    location = models.JSONField(default=list, blank=True)

class Building(models.Model):
    building_id = models.AutoField(primary_key=True)
    campus_id = models.ForeignKey(Campus, on_delete=models.CASCADE, db_column="campus_id")
    name = models.CharField(max_length=100, default="")  # Building name
    number_of_floors = models.IntegerField()  # Number of floors
    location = models.CharField(max_length=255, default="")  # Building location (could be an address or campus area)
    description = models.TextField(blank=True, null=True) # Building description for pop-up

    #coordinates of Corners of the building
    polygon_coordinates = models.JSONField(default=list, blank=True)
    
    #coordinates of building
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    
    def __str__(self):
        return self.name
    
    #Make sure that the JSON object for polygon_coordinates format is correct
    def clean(self):
        super().clean()
        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "longitude": {"type": "number", "format": "float"},  
                    "latitude": {"type": "number", "format": "float"},
                },
                "required": ["longitude", "latitude"],  
                "additionalProperties": False  
            }
        }
        try:
            validate(instance=self.polygon_coordinates, schema=schema)
        except ValidationError as e:
            raise ValidationError({"polygon_coordinates": [e.message]})


#set_password(raw_password) and check_password(raw_password)
class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, default="")
    email = models.EmailField(max_length=255)
    groups = models.ManyToManyField(Group, related_name="app_users_groups", blank=True,  verbose_name="groups")
    user_permissions = models.ManyToManyField(Permission, related_name="app_users_permissions", blank=True, verbose_name="user permissions")


class Floor(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    floor_id = models.AutoField(primary_key=True)
    floor_number = models.IntegerField()
    description = models.TextField(blank=True, null=True)

class PointOfInterest(models.Model):
    poi_id = models.AutoField(primary_key=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    poi_name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    opening_hours = models.JSONField(default=dict)
    
    def set_open_hour(self, open_hour):
        if isinstance(open_hour, str):
            try:
                open_hour = time.fromisoformat(open_hour) 
            except ValueError:
                raise ValueError("Invalid time format. Use HH:MM")
        self.opening_hours["open_hour"] = open_hour.strftime("%H:%M")
        self.save()

    def set_close_hour(self, close_hour):
        if isinstance(close_hour, str):
            try:
                close_hour = time.fromisoformat(close_hour)
            except ValueError:
                raise ValueError("Invalid time format. Use HH:MM")
        self.opening_hours["closed_hour"] = close_hour.strftime("%H:%M")
        self.save()
        
class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    floor_id = models.ForeignKey('Floor', on_delete=models.CASCADE, related_name='rooms')  # Foreign key to Floor model
    room_number = models.CharField(max_length=20) 
    room_type = models.CharField(max_length=50) 
    capacity = models.IntegerField()  
    accessibility_features = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Room {self.room_number}"