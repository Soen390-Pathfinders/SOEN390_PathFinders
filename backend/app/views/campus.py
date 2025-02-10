from ..models import Campus
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import CampusSerializer


@api_view(['GET'])
def get_all_campuses(request):
    campuses = Campus.objects.all()
    serializer = CampusSerializer(campuses, many=True)  # 'many=True' to serialize a queryset
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_campus(request):
    campus_id = request.GET.get("id")
    campus_code = request.GET.get("code")
    
    if not campus_id and not campus_code:
        return Response({"error": "Provide either 'id' or 'code' to retrieve a campus"}, status=status.HTTP_400_BAD_REQUEST)

    campus = Campus.objects.filter(id=campus_id).first() or Campus.objects.filter(code=campus_code).first()

    if not campus:
        return Response({"error": "No campus matches the given parameters."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = CampusSerializer(campus)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def add_campus(request):
    serializer = CampusSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Campus created successfully', 'campus_id': serializer.instance.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['DELETE'])
def remove_campus(request):
    campus_id = request.data.get("id")
    campus_code = request.data.get("code")

    if not campus_id and not campus_code:
        return Response({"error": "Provide either 'id' or 'code' to delete a campus"}, status=status.HTTP_400_BAD_REQUEST)

    campus = Campus.objects.filter(id=campus_id).first() or Campus.objects.filter(code=campus_code).first()

    if not campus:
        return Response({"error": "No campus matches the given parameters."}, status=status.HTTP_404_NOT_FOUND)

    campus.delete()
    return Response({"message": "Campus deleted successfully"}, status=status.HTTP_200_OK)



@api_view(["PUT", "PATCH"])
def modify_campus(request):
    identifier = request.data.get("id") or request.data.get("code")

    if not identifier:
        return Response({"error": "Must provide either 'id' or 'code'."}, status=status.HTTP_400_BAD_REQUEST)

    campus = Campus.objects.filter(id=request.data.get("id")).first() or Campus.objects.filter(code=request.data.get("code")).first()

    if not campus:
        return Response({"error": "Campus not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = CampusSerializer(campus, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

