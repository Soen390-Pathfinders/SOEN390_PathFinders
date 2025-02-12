import csv
from django.core.management.base import BaseCommand
from app.models import Campus, Building, RoomType, AmenityType

# Open the CSV file
def instances(table_name):
    with open(f'app/csv/{table_name}.csv', mode='r') as file:
        reader = csv.DictReader(file)
        
        items = []
        # Iterate through the rows
        for row in reader:
            filtered_row = {key: value for key, value in row.items() if value not in [None, '']}
            items.append(filtered_row)

        return items
    

class Command(BaseCommand):
    help = 'Bulk adds campuses to the database from predefined data'

    def handle(self, *args, **kwargs):
        # Predefined campus data
        campus_data = instances('campus')

        campus_instances = [
            Campus(name=campus['name'], code=campus['code'], latitude=campus.get('latitude'), longitude=campus.get('longitude'))
            for campus in campus_data
        ]

        # Bulk create
        Campus.objects.bulk_create(campus_instances)

        building_data = instances('building')

        building_instances = [
            Building(name=building['BuildingName'], long_name=building['Building Long Name'], code=building['Building'], 
                     address=building['Address'], latitude= building['Latitude'], longitude=building['Longitude'], 
                     campus = Campus.objects.get(code = building['Campus']))
            for building in building_data
        ]

        Building.objects.bulk_create(building_instances)

        roomtype_data = instances('roomtype')
        
        roomtype_instances = [
            RoomType(name = roomtype['name'])
            for roomtype in roomtype_data
        ]

        RoomType.objects.bulk_create(roomtype_instances)

        amenitytype_data = instances('amenitytype')

        amenitytype_instances = [
            AmenityType(name = amenitytype['name'])
            for amenitytype in amenitytype_data
        ]

        AmenityType.objects.bulk_create(amenitytype_instances)

        self.stdout.write(self.style.SUCCESS('Successfully initialized the database'))