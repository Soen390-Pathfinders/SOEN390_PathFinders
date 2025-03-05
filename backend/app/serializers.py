from rest_framework import serializers
from .models import Campus, Building, Floor, Room, RoomType, AmenityType, InsidePOI

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