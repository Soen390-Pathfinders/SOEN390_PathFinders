from django.shortcuts import render
from django.http import JsonResponse
from .models import Building
# Create your views here.
def my_view(request):
    data = {"message": "Hello, world!"}
    return JsonResponse(data)

def hello(request):
    try:
        # Get the first building from the database
        building = Building.objects.first()  # Gets the first entry or None if empty

        if building:
            # Return the building's data as a JSON response
            return JsonResponse({
                'name': building.name,
                'floors': building.number_of_floors,
            })
        else:
            return JsonResponse({'message': 'No buildings found'}, status=404)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)

def get_building(request, building_name):
    pass

def create_building(request):
    pass

def delete_building(request, building_name):
    pass

def update_building(request, building_name):
    pass

def get_building_coordinates(request, building_name):
    pass