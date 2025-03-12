from ..models import Room
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import RoomSerializer

@api_view(['GET'])
def get_all_rooms(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_room(request):
    room_id = request.GET.get("id")
    room_code = request.GET.get("code")
    
    if not room_id and not room_code:
        return Response({"error": "Provide either 'id' or 'code' to retrieve a room"}, status=status.HTTP_400_BAD_REQUEST)

    room = Room.objects.filter(id=room_id).first() or Room.objects.filter(code=room_code).first()

    if not room:
        return Response({"error": "No room matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RoomSerializer(room)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def add_room(request):
    serializer = RoomSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Room created successfully', 'room_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def remove_room(request):
    room_id = request.data.get("id")
    room_code = request.data.get("code")

    if not room_id and not room_code:
        return Response({"error": "Provide either 'id' or 'code' to delete a room"}, status=status.HTTP_400_BAD_REQUEST)

    room = Room.objects.filter(id=room_id).first() or Room.objects.filter(code=room_code).first()

    if not room:
        return Response({"error": "No room matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    room.delete()
    return Response({"message": "Room deleted successfully"}, status=status.HTTP_200_OK)




@api_view(["PUT", "PATCH"])
def modify_room(request):
    identifier = request.data.get("id") or request.data.get("code")

    if not identifier:
        return Response({"error": "Must provide either 'id' or 'code'."}, status=status.HTTP_400_BAD_REQUEST)

    room = Room.objects.filter(id=request.data.get("id")).first() or Room.objects.filter(code=request.data.get("code")).first()

    if not room:
        return Response({"error": "Room not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RoomSerializer(room, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)