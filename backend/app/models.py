from django.db import models
from jsonschema import validate, ValidationError
from django.contrib.postgres.fields import JSONField
# Create your models here.
class Campus(models.Model):
    campus_id = models.AutoField()

class Building(models.Model):
    # campus_id = 
    name = models.CharField(max_length=100, default="")  # Building name
    number_of_floors = models.IntegerField()  # Number of floors
    location = models.CharField(max_length=255, default="")  # Building location (could be an address or campus area)
    description = models.CharField(max_length=255, default="") # Building description for pop-up

    #Corners of the building
    polygon_coordinates = models.JSONField(default=list, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    
    def __str__(self):
        return self.name
    
    #Make sure that the
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