from ..models import Building
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import BuildingSerializer

@api_view(['GET'])
def get_all_buildings(request):
    buildings = Building.objects.all()
    serializer = BuildingSerializer(buildings, many=True)  # 'many=True' to serialize a queryset
    return Response(serializer.data, status=status.HTTP_200_OK)
    


@api_view(['GET'])
def get_building(request):
    building_id = request.GET.get("id")
    building_code = request.GET.get("code")
    
    if not building_id and not building_code:
        return Response({"error": "Provide either 'id' or 'code' to retrieve a building"}, status=status.HTTP_400_BAD_REQUEST)

    building = Building.objects.filter(id=building_id).first() or Building.objects.filter(code=building_code).first()

    if not building:
        return Response({"error": "No building matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = BuildingSerializer(building)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def add_building(request):
    serializer = BuildingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Building created successfully', 'building_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def remove_building(request):
    building_id = request.data.get("id")
    building_code = request.data.get("code")

    if not building_id and not building_code:
        return Response({"error": "Provide either 'id' or 'code' to delete a building."}, status=status.HTTP_400_BAD_REQUEST)

    campus = Building.objects.filter(id=building_id).first() or Building.objects.filter(code=building_code).first()

    if not campus:
        return Response({"error": "No building matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    campus.delete()
    return Response({"message": "Building deleted successfully"}, status=status.HTTP_200_OK)




@api_view(["PUT", "PATCH"])
def modify_building(request):
    identifier = request.data.get("id") or request.data.get("code")

    if not identifier:
        return Response({"error": "Must provide either 'id' or 'code'."}, status=status.HTTP_400_BAD_REQUEST)

    building = Building.objects.filter(id=request.data.get("id")).first() or Building.objects.filter(code=request.data.get("code")).first()

    if not building:
        return Response({"error": "No building matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BuildingSerializer(building, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)