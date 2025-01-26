from django.db import models

# Create your models here.
class Building(models.Model):
    name = models.CharField(max_length=100)  # Building name
    number_of_floors = models.IntegerField()  # Number of floors
    location = models.CharField(max_length=255)  # Building location (could be an address or campus area)

    def __str__(self):
        return self.name