from ..models import Floor
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import FloorSerializer


@api_view(['GET'])
def get_all_floors(request):
    floors = Floor.objects.all()
    serializer = FloorSerializer(floors, many=True)  # 'many=True' to serialize a queryset
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_floor(request):
    floor_id = request.GET.get("id")
    building_code = request.GET.get("building")
    floor_number = request.GET.get("number")

    if not floor_id and (not building_code or not floor_number):
        return Response({"error": "Provide either 'id' or both 'building' and 'number' to retrieve a floor."}, status=status.HTTP_400_BAD_REQUEST)

    # Query by ID if provided
    if floor_id:
        floor = Floor.objects.filter(id=floor_id).first()
    # Otherwise, query by building_code and floor_number
    else:
        floor = Floor.objects.filter(building__code=building_code, number=floor_number).first()

    if not floor:
        return Response({"error": "No floor matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = FloorSerializer(floor)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['POST'])
def add_floor(request):
    serializer = FloorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Floor created successfully', 'floor_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def remove_floor(request):
    floor_id = request.data.get("id")
    building_code = request.data.get("building")
    floor_number = request.data.get("number")

    if not floor_id and (not building_code or not floor_number):
        return Response({"error": "Provide either 'id' or both 'building' and 'number' to delete a floor."}, status=status.HTTP_400_BAD_REQUEST)

    if floor_id:
        floor = Floor.objects.filter(id=floor_id).first()
    elif building_code and floor_number:
        floor = Floor.objects.filter(building__code=building_code, number=floor_number).first()
    else:
        return Response({"error": "Provide both 'building_code' and 'number' to delete a floor."}, status=status.HTTP_400_BAD_REQUEST)

    if not floor:
        return Response({"error": "No floor matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    floor.delete()  # Delete the floor

    return Response({"success": "Floor deleted successfully."}, status=status.HTTP_200_OK)




@api_view(["PUT", "PATCH"])
def modify_floor(request):
    floor_id = request.data.get("id")
    building_code = request.data.get("building")
    floor_number = request.data.get("number")

    # Ensure that either 'id' or both 'building_code' and 'number' are provided
    if not floor_id and (not building_code or not floor_number):
        return Response({"error": "Provide either 'id' or both 'building' and 'number' to modify a floor."}, status=status.HTTP_400_BAD_REQUEST)

    # Filter the floor based on the provided identifiers
    if floor_id:
        floor = Floor.objects.filter(id=floor_id).first()
    elif building_code and floor_number:
        floor = Floor.objects.filter(building__code=building_code, number=floor_number).first()

    if not floor:
        return Response({"error": "No floor matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    # Use the FloorSerializer to validate and save the modified data
    serializer = FloorSerializer(floor, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()  # Save the updated floor data
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
