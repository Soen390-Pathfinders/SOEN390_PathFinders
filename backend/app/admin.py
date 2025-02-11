from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Campus)
admin.site.register(Building)
admin.site.register(Floor)
admin.site.register(Room)
admin.site.register(User)
admin.site.register(AmenityType)
admin.site.register(RoomType)
admin.site.register(PointOfInterest)


