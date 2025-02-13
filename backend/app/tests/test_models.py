import pytest
from django.db.utils import IntegrityError
from app.models import Building, Campus, User, Floor, PointOfInterest, Room
from django.core.exceptions import ValidationError

@pytest.mark.django_db
def test_create_campus():
    campus = Campus.objects.create(campus_name="Main Campus", location={"lat": 45.5017, "lng": -73.5673})
    assert Campus.objects.count() == 1
    assert campus.campus_name == "Main Campus"

@pytest.mark.django_db
def test_create_building():
    campus = Campus.objects.create(campus_name="Science Campus")
    building = Building.objects.create(
        campus_id=campus,
        name="Science Building",
        number_of_floors=5,
        location="Downtown",
        polygon_coordinates=[{"longitude": -73.5673, "latitude": 45.5017}],
        latitude=45.5017,
        longitude=-73.5673,
    )
    assert Building.objects.count() == 1
    assert building.name == "Science Building"

@pytest.mark.django_db
def test_invalid_polygon_coordinates():
    campus = Campus.objects.create(campus_name="Tech Campus")
    building = Building(
        campus_id=campus,
        name="Tech Building",
        number_of_floors=3,
        polygon_coordinates=[{"lng": -73.5673, "lat": 45.5017}],
    )
    with pytest.raises(ValidationError):
        building.clean() # Ensure ValidationError is raised

@pytest.mark.django_db
def test_create_floor():
    campus = Campus.objects.create(campus_name="Health Campus")
    building = Building.objects.create(campus_id=campus, name="Health Sciences", number_of_floors=10)
    floor = Floor.objects.create(building=building, floor_number=3, description="Third Floor")
    assert Floor.objects.count() == 1
    assert floor.floor_number == 3

@pytest.mark.django_db
def test_create_room():
    campus = Campus.objects.create(campus_name="Engineering Campus")
    building = Building.objects.create(campus_id=campus, name="Engineering Block", number_of_floors=7)
    floor = Floor.objects.create(building=building, floor_number=2)
    room = Room.objects.create(floor_id=floor, room_number="201", room_type="Lecture Hall", capacity=100)
    
    assert Room.objects.count() == 1
    assert room.room_number == "201"
    assert room.room_type == "Lecture Hall"

@pytest.mark.django_db
def test_create_point_of_interest():
    campus = Campus.objects.create(campus_name="Main Campus")
    building = Building.objects.create(campus_id=campus, name="Library", number_of_floors=4)
    poi = PointOfInterest.objects.create(building=building, poi_name="Cafeteria", category="Food", description="Serving Food", opening_hours={})
    
    assert PointOfInterest.objects.count() == 1
    assert poi.poi_name == "Cafeteria"

@pytest.mark.django_db
def test_set_opening_hours():
    campus = Campus.objects.create(campus_name="Business Campus")
    building = Building.objects.create(campus_id=campus, name="Business Center", number_of_floors=6)
    poi = PointOfInterest.objects.create(building=building, poi_name="Coffee Shop", category="Food", opening_hours={})
    
    poi.set_open_hour("08:00")
    poi.set_close_hour("20:00")

    assert poi.opening_hours["open_hour"] == "08:00"
    assert poi.opening_hours["closed_hour"] == "20:00"

@pytest.mark.django_db
def test_set_invalid_opening_hour():
    campus = Campus.objects.create(campus_name="Art Campus")
    building = Building.objects.create(campus_id=campus, name="Art Block", number_of_floors=2)
    poi = PointOfInterest.objects.create(building=building, poi_name="Gallery", category="Art", opening_hours={})
    
    with pytest.raises(ValueError, match="Invalid time format"):
        poi.set_open_hour("invalid_time")

@pytest.mark.django_db
def test_user_creation():
    user = User.objects.create_user(name="Test User", email="test@email.com", groups=[], user_permissions=[])
    
    assert User.objects.count() == 1
    assert user.name == "Test User"