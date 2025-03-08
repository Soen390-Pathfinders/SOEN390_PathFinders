import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from app.models import Campus, Building, Floor, RoomType, Room, AmenityType, InsidePOI

@pytest.fixture
def campus(db):
    return Campus.objects.create(name="Main Campus", code="MC", latitude=45.4971, longitude=-73.5792)

@pytest.fixture
def building(db, campus):
    return Building.objects.create(name="Hall Building", long_name="Henry F. Hall Building", code="H", address="1455 De Maisonneuve Blvd W", campus=campus, floor_count=12)

@pytest.fixture
def floor(db, building):
    return Floor.objects.create(building=building, number='2')

@pytest.fixture
def room_type(db):
    return RoomType.objects.create(name="Classroom")

@pytest.fixture
def create_poi(db, create_amenity, floor):
    poi = InsidePOI.objects.create(floor=floor, x_coor=100, y_coor=200)
    poi.amenities.add(create_amenity)
    return poi

@pytest.fixture
def create_room(db, floor, room_type, create_poi):
    room = Room.objects.create(number="H-110", floor=floor, capacity=200, is_wheelchair_accessible=True, location=create_poi)
    room.type.add(room_type)
    return room

@pytest.fixture
def create_amenity(db):
    return AmenityType.objects.create(name="Elevator")


@pytest.mark.django_db
def test_create_building(building):
    assert Building.objects.count() == 1
    assert building.name == "Hall Building"
    assert building.code == "H"

@pytest.mark.django_db
def test_create_floor(floor):
    assert Floor.objects.count() == 1
    assert floor.number == '2'
    assert floor.code == "H-2"

@pytest.mark.django_db
def test_create_room(create_room):
    assert Room.objects.count() == 1
    assert create_room.number == "H-110"
    assert create_room.capacity == 200
    assert create_room.is_wheelchair_accessible == True
    assert create_room.location.x_coor == 100
    assert create_room.location.y_coor == 200

@pytest.mark.django_db
def test_create_inside_poi(create_poi):
    assert InsidePOI.objects.count() == 1
    assert create_poi.x_coor == 100
    assert create_poi.y_coor == 200
