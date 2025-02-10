from rest_framework import serializers
from .models import Campus, Building, Floor

class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = '__all__'  # Or specify fields explicitly: ['id', 'name', 'code', 'latitude', 'longitude']


class BuildingSerializer(serializers.ModelSerializer):
    campus = serializers.SlugRelatedField(queryset=Campus.objects.all(), slug_field="code")
    class Meta:
        model = Building
        fields = '__all__'  # Or specify fields explicitly


class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        fields = '__all__'  # Or specify fields explicitly