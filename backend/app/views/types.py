from ..models import AmenityType, RoomType
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import RoomTypeSerializer, AmenityTypeSerializer

@api_view(['GET'])
def get_all_roomType(request):
    roomTypes = RoomType.objects.all()
    serialized_roomTypes = RoomTypeSerializer(roomTypes, many=True)
    return Response(serialized_roomTypes.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_roomType(request):
    pass

@api_view(['POST'])  
def add_roomType(request):
    pass

@api_view(['DELETE']) 
def remove_roomType(request):
    pass

@api_view(['PUT', 'PATCH']) 
def modify_roomType(request):
    pass

@api_view(['GET'])
def get_all_amenityType(request):
    pass

@api_view(['GET'])
def get_amenityType(request):
    pass

@api_view(['POST']) 
def add_amenityType(request):
    pass

@api_view(['DELETE']) 
def remove_amenityType(request):
    pass

@api_view(['PUT', 'PATCH']) 
def modify_amenityType(request):
    pass
    