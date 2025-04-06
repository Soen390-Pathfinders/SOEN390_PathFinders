from ..models import Floor, InsidePOI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import FloorSerializer, InsidePOISerializer
from collections import defaultdict

@api_view(['GET'])
def get_all_floors(request):
    floors = Floor.objects.all()
    serializer = FloorSerializer(floors, many=True)  # 'many=True' to serialize a queryset
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_floor(request):
    floor_id = request.GET.get("id")
    floor_code = request.GET.get("code")
    
    if not floor_id and not floor_code:
        return Response({"error": "Provide either 'id' or 'code' to retrieve a building floor"}, status=status.HTTP_400_BAD_REQUEST)

    floor = Floor.objects.filter(id=floor_id).first() or Floor.objects.filter(code=floor_code).first()

    if not floor:
        return Response({"error": "No building floor matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = FloorSerializer(floor)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_floor_amenities(request):
    """
    Returns all amenities on a floor organized by amenity type with locations
    URL params:
    - code: Floor code
    """
    floor_code = request.GET.get("code")
    
    if not floor_code:
        return Response({"error": "Please provide a floor code"}, status=status.HTTP_400_BAD_REQUEST)
    
    floor = Floor.objects.filter(code=floor_code).first()
    
    if not floor:
        return Response({"error": f"Floor with code {floor_code} not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Get all POIs on this floor
    pois = InsidePOI.objects.filter(floor=floor)
    
    # Organize POIs by amenity
    amenity_map = defaultdict(list)
    
    for poi in pois:
        # Get simplified POI data
        poi_data = InsidePOISerializer(poi).data
        
        # Add this POI to each of its amenity categories
        for amenity in poi.amenities.all():
            amenity_map[amenity.name].append(poi_data)
    
    # Convert defaultdict to regular dict for response
    result = dict(amenity_map)
    
    return Response(result, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_floor(request):
    serializer = FloorSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()  # Save the updated floor data
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Floor created successfully', 'floor_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def remove_floor(request):
    floor_id = request.data.get("id")
    floor_code = request.data.get("code")

    if not floor_id and not floor_code:
        return Response({"error": "Provide either 'id' or 'code' to delete a building floor"}, status=status.HTTP_400_BAD_REQUEST)

    floor = Floor.objects.filter(id=floor_id).first() or Floor.objects.filter(code=floor_code).first()

    if not floor:
        return Response({"error": "No building floor matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    floor.delete()
    return Response({"message": "Floor deleted successfully"}, status=status.HTTP_200_OK)




@api_view(["PUT", "PATCH"])
def modify_floor(request):
    identifier = request.data.get("id") or request.data.get("code")

    if not identifier:
        return Response({"error": "Must provide either 'id' or 'code'."}, status=status.HTTP_400_BAD_REQUEST)

    floor = Floor.objects.filter(id=request.data.get("id")).first() or Floor.objects.filter(code=request.data.get("code")).first()

    if not floor:
        return Response({"error": "Building floor not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = FloorSerializer(floor, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
