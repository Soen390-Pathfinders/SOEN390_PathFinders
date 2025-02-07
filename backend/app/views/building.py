from ..models import *
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
import json


def get_building(request, name):
    building = get_object_or_404(Building, name=name)
    building_data = serializers.serialize("json", [building])
    return JsonResponse(building_data, safe=False)

def create_building(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error" : "invalid json data"}, status=400)
        
    else:
        return JsonResponse({"error" : "only post requests allowed for create_building"}, status=405)