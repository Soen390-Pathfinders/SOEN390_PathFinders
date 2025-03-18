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


class AmenityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmenityType
        fields = ['id', 'name']


class InsidePOISerializer(serializers.ModelSerializer):
    floor = serializers.SlugRelatedField(queryset=Floor.objects.all(), slug_field="code")
    # For write operations
    amenities = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True,
        required=False
    )
    # Custom field to return just the names as a list
    amenity_names = serializers.SerializerMethodField(read_only=True)
    
    def get_amenity_names(self, obj):
        return [amenity.name for amenity in obj.amenities.all()]
    
    def to_internal_value(self, data):
        if isinstance(data.get('amenities'), str):
            data['amenities'] = data['amenities'].split('|')
        return super().to_internal_value(data)

    def create(self, validated_data):
        amenity_type_names = validated_data.pop('amenities', [])
        insidepoi = InsidePOI.objects.create(**validated_data)

        for name in amenity_type_names:
            amenity_type = AmenityType.objects.get(name=name)
            insidepoi.amenities.add(amenity_type)

        return insidepoi
        
    def update(self, instance, validated_data):
        if 'amenities' in validated_data:
            amenity_names = validated_data.pop('amenities')
            instance.amenities.clear()
            for name in amenity_names:
                amenity = AmenityType.objects.get(name=name)
                instance.amenities.add(amenity)
                
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
        
    class Meta:
        model = InsidePOI
        fields = ['id', 'floor', 'description', 'is_accessible',
                  'amenities', 'amenity_names', 'x_coor', 'y_coor']

class RoomSerializer(serializers.ModelSerializer):
    floor = serializers.SlugRelatedField(queryset=Floor.objects.all(), slug_field="code")
    # For write operations
    type = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True,
        required=False
    )
    # Custom field to return just the names as a list
    room_types = serializers.SerializerMethodField(read_only=True)
    
    # Use a nested serializer for read operations (location)
    location_data = InsidePOISerializer(source='location', read_only=True)
    # Keep the original field for write operations
    location = serializers.SlugRelatedField(
        queryset=InsidePOI.objects.all(), 
        slug_field="id", 
        allow_null=True, 
        required=False,
        write_only=True
    )
    
    def get_room_types(self, obj):
        return [room_type.name for room_type in obj.type.all()]

    def to_internal_value(self, data):
        if isinstance(data.get('type'), str):
            data['type'] = data['type'].split('|')
        return super().to_internal_value(data)

    def create(self, validated_data):
        room_type_names = validated_data.pop('type', [])
        room = Room.objects.create(**validated_data)

        for name in room_type_names:
            room_type = RoomType.objects.get(name=name)
            room.type.add(room_type)

        return room
        
    def update(self, instance, validated_data):
        if 'type' in validated_data:
            room_type_names = validated_data.pop('type')
            instance.type.clear()
            for name in room_type_names:
                room_type = RoomType.objects.get(name=name)
                instance.type.add(room_type)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

    class Meta:
        model = Room
        fields = ['id', 'number', 'floor', 'code', 'capacity', 'type', 
                  'room_types', 'location', 'location_data']

class EdgeSerializer(serializers.ModelSerializer):
    node1 = serializers.SlugRelatedField(queryset=InsidePOI.objects.all(), slug_field="id")
    node2 = serializers.SlugRelatedField(queryset=InsidePOI.objects.all(), slug_field="id")

    class Meta:
        model = Edge
        fields = '__all__'


