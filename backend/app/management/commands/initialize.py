import csv
from django.core.management.base import BaseCommand
from app.serializers import CampusSerializer, BuildingSerializer, RoomTypeSerializer, AmenityTypeSerializer, FloorSerializer, InsidePOISerializer, RoomSerializer

# Open the CSV file
def instances(csv_file_name):
    with open(f'app/csv/{csv_file_name}.csv', mode='r') as file:
        reader = csv.DictReader(file)
        
        items = []
        # Iterate through the rows
        for row in reader:
            filtered_row = {key: value for key, value in row.items() if value not in [None, '']}
            items.append(filtered_row)

        return items
    

def add_data_to_database(csv_file_name, object_serializer):
    object_data = instances(csv_file_name)

    serializer = object_serializer(data=object_data, many=True)

    if serializer.is_valid(): serializer.save()
    else: print(serializer.errors)
    

class Command(BaseCommand):
    help = 'Bulk adds campuses to the database from predefined data'

    def handle(self, *args, **kwargs):
        
        add_data_to_database('campus', CampusSerializer)
        add_data_to_database('building', BuildingSerializer)
        add_data_to_database('roomtype', RoomTypeSerializer)
        add_data_to_database('amenitytype', AmenityTypeSerializer)
        add_data_to_database('floor', FloorSerializer)
        add_data_to_database('insidepoi', InsidePOISerializer)
        add_data_to_database('room', RoomSerializer)

        self.stdout.write(self.style.SUCCESS('Successfully initialized the database'))