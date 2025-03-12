from ..models import Edge
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import EdgeSerializer


@api_view(['GET'])
def get_all_edges(request):
    edges = Edge.objects.all()
    serializer = EdgeSerializer(edges, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)