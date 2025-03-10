import ast
from rest_framework import serializers
from .models import Campus, Building, Floor, Room, RoomType, AmenityType, InsidePOI, Edge

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
    building = serializers.SlugRelatedField(queryset=Building.objects.all(), slug_field="code")
    class Meta:
        model = Floor
        fields = '__all__'  # Or specify fields explicitly


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['id', 'name']

class RoomSerializer(serializers.ModelSerializer):
    floor = serializers.SlugRelatedField(queryset=Floor.objects.all(), slug_field="code")
     # Accept a list of room type names
    type = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True
    )
    location = serializers.SlugRelatedField(queryset=InsidePOI.objects.all(), slug_field="id", allow_null=True, required=False)

    def to_internal_value(self, data):
        # Convert room types from a string format (CSV) to a list
        if isinstance(data.get('type'), str):
            data['type'] = data['type'].split('|')  # Split by '|'
        
        return super().to_internal_value(data)

    # Modify the save method to handle names and convert them to RoomType objects
    def create(self, validated_data):
        room_type_names = validated_data.pop('type')  # Get the names
        room = Room.objects.create(**validated_data)

        # Look up RoomTypes by name and associate them with the room
        for name in room_type_names:
            room_type = RoomType.objects.get(name=name)
            room.type.add(room_type)

        return room
    class Meta:
        model = Room
        fields = '__all__'  # Or specify fields explicitly


class AmenityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenityType
        fields = ['id', 'name']


class InsidePOISerializer(serializers.ModelSerializer):
    floor = serializers.SlugRelatedField(queryset=Floor.objects.all(), slug_field="code")
     # Accept a list of room type names
    amenities = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True
    )
    
    def to_internal_value(self, data):
        # Convert amenities from a string format (CSV) to a list
        if isinstance(data.get('amenities'), str):
            data['amenities'] = data['amenities'].split('|')  # Split by '|'
        
        return super().to_internal_value(data)


    def create(self, validated_data):
        amenity_type_names = validated_data.pop('amenities')  # Get the names
        insidepoi = InsidePOI.objects.create(**validated_data)

        for name in amenity_type_names:
            amenity_type = AmenityType.objects.get(name=name)
            insidepoi.amenities.add(amenity_type)

        return insidepoi
    class Meta:
        model = InsidePOI
        fields = '__all__'  # Or specify fields explicitly


class EdgeSerializer(serializers.ModelSerializer):
    node1 = serializers.SlugRelatedField(queryset=InsidePOI.objects.all(), slug_field="id")
    node2 = serializers.SlugRelatedField(queryset=InsidePOI.objects.all(), slug_field="id")

    class Meta:
        model = Edge
        fields = '__all__'
