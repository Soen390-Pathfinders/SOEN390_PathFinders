from ..models import *
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import FloorSerializer
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(['GET'])
def get_all_floors(request):
    floors = Floor.objects.all()
    serializer = FloorSerializer(floors, many=True)  # 'many=True' to serialize a queryset
    return Response(serializer.data)


@csrf_exempt  # Only use for testing, remove in production
def get_campus(request):
    if request.method == "GET":
        campus_id = request.GET.get("id")
        campus_code = request.GET.get("code")

        if not campus_id and not campus_code:
            return JsonResponse({"error": "Provide either 'id' or 'code' to retrieve a campus"}, status=400)

        # Get campus by ID or Code
        campus = None
        if campus_id:
            campus = get_object_or_404(Campus, id=campus_id)
        elif campus_code:
            campus = get_object_or_404(Campus, code=campus_code)

        return JsonResponse({
            "id": campus.id,
            "name": campus.name,
            "code": campus.code,
            "latitude": campus.latitude,
            "longitude": campus.longitude
        }, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def add_floor(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Extract values from the JSON request
            code = data.get('code')
            number = data.get('number')
            description = data.get('description')

            # Create the campus entry
            floor = Floor.objects.create(
                code=code,
                number=number,
                description= description
            )

            return JsonResponse({'message': 'Floor created successfully', 'floor_id': floor.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid method'}, status=405)



@csrf_exempt  # Only use this if you're testing without CSRF tokens (not recommended for production)
def remove_campus(request):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            campus_id = data.get("id")
            campus_code = data.get("code")

            if not campus_id and not campus_code:
                return JsonResponse({"error": "Provide either 'id' or 'code' to delete a campus"}, status=400)

            # Get campus by ID or Code
            campus = None
            if campus_id:
                campus = get_object_or_404(Campus, id=campus_id)
            elif campus_code:
                campus = get_object_or_404(Campus, code=campus_code)

            campus.delete()
            return JsonResponse({"message": "Campus deleted successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)



@csrf_exempt
@api_view(["PUT", "PATCH"])
def modify_campus(request):
    identifier = request.data.get("id") or request.data.get("code")  # Accept ID or code

    if not identifier:
        return Response({"error": "Must provide either 'id' or 'code'."}, status=400)

    try:
        if "id" in request.data:
            campus = Campus.objects.get(id=request.data["id"])
        else:
            campus = Campus.objects.get(code=request.data["code"])
    except Campus.DoesNotExist:
        return Response({"error": "Campus not found."}, status=404)

    if request.method == "PUT":
        full_data = {
            "name": request.data.get('name'),
            "code": request.data.get('code'),
            "latitude": request.data.get('latitude', None),
            "longitude": request.data.get('longitude', None)
        }
        # Replace all fields (but keep ID and Code intact)
        serializer = FloorSerializer(campus, data=full_data, partial=False)
    else:  # PATCH
        # Only update provided fields
        serializer = FloorSerializer(campus, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=400)