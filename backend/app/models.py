from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission 
from math import sqrt

class Campus(models.Model):
    id = models.AutoField(primary_key =True)
    name = models.CharField(max_length = 255)
    code = models.CharField(max_length=3,unique=True)

    #coordinates of campus
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)

    def __str__(self):
        return f"{self.name} Campus"

class Building(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)  # Building name
    long_name= models.CharField(max_length=255, null=True)
    code = models.CharField(max_length=3, unique=True)
    description = models.TextField(blank=True, null=True) # Building description for pop-up
    address = models.CharField(max_length=255, null=True)

    campus= models.ForeignKey(Campus, on_delete=models.CASCADE, db_column="campus_id", default=1)
    floor_count = models.IntegerField(default=1)  # Number of floors
    
    #coordinates of building
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    
    def __str__(self):
        return self.name


#set_password(raw_password) and check_password(raw_password)
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, default="")
    email = models.EmailField(max_length=255)
    groups = models.ManyToManyField(Group, related_name="app_users_groups", blank=True,  verbose_name="groups")
    user_permissions = models.ManyToManyField(Permission, related_name="app_users_permissions", blank=True, verbose_name="user permissions")


class Floor(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    number = models.CharField(max_length=3)
    code = models.CharField(max_length=20, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.code = f"{self.building.code}-{self.number}"
        super().save(*args, **kwargs)



class AmenityType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class InsidePOI(models.Model):
    id = models.AutoField(primary_key=True)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, default=1)
    description = models.TextField(blank=True, null=True)
    amenities = models.ManyToManyField(AmenityType, related_name="amenities", blank=True)
    x_coor = models.IntegerField();
    y_coor = models.IntegerField();



class RoomType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Room(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.CharField(max_length=10)
    floor= models.ForeignKey('Floor', on_delete=models.CASCADE, default=1)
    code = models.CharField(max_length=20, unique=True, blank=True)
    capacity = models.PositiveIntegerField(null=True)
    is_wheelchair_accessible = models.BooleanField(default=False)
    type = models.ManyToManyField(RoomType, related_name="rooms")
    location = models.ForeignKey(InsidePOI, on_delete=models.SET_DEFAULT, blank=True, default=1)

    def save(self, *args, **kwargs):
        self.code = f"{self.floor.building.code}-{self.number}"
        super().save(*args, **kwargs)
      

    def __str__(self):
        return f"{self.code} (Capacity: {self.capacity})"



class Edge(models.Model):
    node1 = models.ForeignKey('InsidePOI', on_delete=models.CASCADE, related_name='edges_from')
    node2 = models.ForeignKey('InsidePOI', on_delete=models.CASCADE, related_name='edges_to')
    distance = models.FloatField(editable=False)  # Auto-calculated

    def save(self, *args, **kwargs):
        # Calculate Euclidean distance based on latitude/longitude
        self.distance = sqrt(
            (self.node1.x_coor - self.node2.x_coor) ** 2 +
            (self.node1.y_coor - self.node2.y_coor) ** 2
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Edge from node#{self.node1.id} to node#{self.node2.id} - Distance: {self.distance}"