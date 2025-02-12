from ..models import InsidePOI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import InsidePOISerializer

@api_view(['GET'])
def get_all_insidepois(request):
    pois = InsidePOI.objects.all()
    serializer = InsidePOISerializer(pois, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_insidepoi(request):
    poi_id = request.GET.get("id")
    
    if not poi_id:
        return Response({"error": "Provide 'id' to retrieve a point of interest."}, status=status.HTTP_400_BAD_REQUEST)

    poi = InsidePOI.objects.filter(id=poi_id).first()

    if not poi:
        return Response({"error": "No point of interest matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = InsidePOI(poi)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def add_insidepoi(request):
    serializer = InsidePOISerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Point of interest created successfully', 'poi_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def remove_insidepoi(request):
    poi_id = request.data.get("id")

    if not poi_id:
        return Response({"error": "Provide 'id' to delete a point of interest."}, status=status.HTTP_400_BAD_REQUEST)

    poi = InsidePOI.objects.filter(id=poi_id).first()

    if not poi:
        return Response({"error": "No point of interest matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    poi.delete()
    return Response({"message": "Point of interest deleted successfully"}, status=status.HTTP_200_OK)




@api_view(["PUT", "PATCH"])
def modify_insidepoi(request):
    identifier = request.data.get("id")

    if not identifier:
        return Response({"error": "Must provide either 'id'."}, status=status.HTTP_400_BAD_REQUEST)

    poi = InsidePOI.objects.filter(id=identifier).first()
    if not poi:
        return Response({"error": "Point of interest not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InsidePOISerializer(poi, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)