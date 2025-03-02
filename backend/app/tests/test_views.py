import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from app.models import Building, Campus, Floor, Room, InsidePOI, RoomType, AmenityType

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def campus(db):
    return Campus.objects.create(name="Campus A", code="A")

@pytest.fixture
def building(db, campus):
    return Building.objects.create(name="Building 1", code="B1", campus=campus)

@pytest.mark.django_db
def test_get_all_buildings(api_client, building): #works
    response = api_client.get(reverse("get_all_buildings"))
    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_get_building_by_code(api_client, building): #works
    url = reverse("get_building") + "?code=B1"
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["code"] == "B1"

@pytest.mark.django_db
def test_get_building_invalid(api_client): #works
    response = api_client.get(reverse("get_building"), {"id": 9999})
    assert response.status_code == 400

@pytest.mark.django_db
def test_add_building(api_client, campus): #works
    url = reverse("add_building")
    payload = {
        "name": "Building 2",
        "code": "B2",
        "campus": campus.code
    }
    response = api_client.post(url, data=payload, format="json")
    assert response.status_code == 201
    assert 'building_id' in response.data

@pytest.mark.django_db
def test_add_building_invalid(api_client): #works
    response = api_client.post(reverse("add_building"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_building(api_client, building): #works
    url = reverse("remove_building")
    payload = {"code": building.code}   
    response = api_client.delete(url, data=payload, format="json")
    assert response.status_code == 200
    assert not Building.objects.filter(code=building.code).exists()

@pytest.mark.django_db
def test_remove_building_invalid(api_client): #works
    response = api_client.delete(reverse('remove_building'), {'id': 9999}, format='json')
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_building(api_client, building): #works
    url = reverse("modify_building")
    payload = {
        "id": building.id,
        "name": "Building 3",
        "code": "B3"
    }
    response = api_client.put(url, data=payload, format="json")
    assert response.status_code == 200
    assert response.data["name"] == "Building 3"
    assert response.data["code"] == "B3"

@pytest.mark.django_db
def test_modify_building_invalid(api_client): #works
    response = api_client.put(reverse("modify_building"), {"id": 9999, "name": "Building 3"})
    assert response.status_code == 404 

@pytest.fixture
def create_campus(db):
    Campus.objects.create(name="Campus A", code= "A", latitude=-40.37402, longitude= 30.028945)
    Campus.objects.create(name="Campus B", code="B")
    Campus.objects.create(name="Campus George Alex Smith", code="GAS", latitude=32.45908)
    return

@pytest.mark.django_db
def test_get_all_campuses(api_client, create_campus): #works
    url = reverse("get_all_campuses")  # Ensure you have a URL name for your campus list view
    response = api_client.get(url)
    
    assert response.status_code == 200
    assert len(response.data) == 3

@pytest.mark.django_db
def test_get_campus_by_code(api_client, create_campus): #works
    url = reverse("get_campus") + "?code=A"
    response = api_client.get(url)

    assert response.status_code == 200
    assert response.json()["name"] == "Campus A"
    assert response.json()["code"] == "A"

@pytest.mark.django_db
def test_add_campus(api_client): #works
    url = reverse("add_campus")  # Ensure you have this route defined
    payload = {
        "name": "New Campus",
        "code": "NEW"
    }
    
    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Campus.objects.filter(code="NEW").exists()

@pytest.mark.django_db
def test_delete_campus(api_client, create_campus): #works
    url = reverse("remove_campus")
    payload = {"code": "GAS"}

    response = api_client.delete(url, data=payload, format="json")

    assert response.status_code == 200
    assert not Campus.objects.filter(code="GAS").exists() 

@pytest.fixture
def floor(db, building):
    return Floor.objects.create(code="F1", number=1, building=building)

@pytest.mark.django_db
def test_get_all_floors(api_client, floor): #works
    url = reverse("get_all_floors")
    response = api_client.get(url)

    assert response.status_code == 200
    assert len(response.data) > 0

@pytest.mark.django_db
def test_get_floor_by_code(api_client, floor): #works
    response = api_client.get(reverse("get_floor"), {"code": floor.code})

    assert response.status_code == 200
    assert response.json()["code"] == floor.code

@pytest.mark.django_db
def test_get_floor_invalid(api_client): #works
    response = api_client.get(reverse("get_floor"), {"id": 9999})

    assert response.status_code == 400

@pytest.mark.django_db
def test_add_floor(api_client, floor, campus): #failed
    building = Building.objects.create(name="Building 4", code="B4", campus=campus)
    url = reverse("add_floor")
    payload = {
        "code": "F2",
        "number": 2,
        "building": building.code
    }

    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Floor.objects.filter(code="F2").exists()

@pytest.mark.django_db
def test_add_floor_invalid(api_client): #works
    response = api_client.post(reverse("add_floor"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_floor(api_client, floor): #works
    url = reverse("remove_floor")
    payload = {"id": floor.id}

    response = api_client.delete(url, data=payload, format="json")

    assert response.status_code == 200
    assert not Floor.objects.filter(id=floor.id).exists()

@pytest.mark.django_db
def test_remove_floor_invalid(api_client): #works
    response = api_client.delete(reverse("remove_floor"), {"id": 9999}, format="json")
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_floor(api_client, floor, campus): #failed
    url = reverse("modify_floor")
    payload = {
        "id": floor.id,
        "code": "F3",
        "number": 3,
    }

    response = api_client.put(url, data=payload, format="json")

    assert response.status_code == 200
    assert response.json()["number"] == "3"
    assert response.json()["code"] == floor.code

@pytest.mark.django_db
def test_modify_floor_invalid(api_client): #works
    response = api_client.put(reverse("modify_floor"), {"id": 9999, "name": "Floor 3"})
    assert response.status_code == 404

@pytest.fixture
def room_type(db):
    return RoomType.objects.create(name="Room Type 1")

@pytest.fixture
def room(db, floor, room_type):
    room = Room.objects.create(number=1, floor=floor, code="R1")
    room.type.add(room_type)
    return room
    
@pytest.mark.django_db
def test_get_all_rooms(api_client, room): #works
    response = api_client.get(reverse("get_all_rooms"))

    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_get_room_by_code(api_client, room): #works
    response = api_client.get(reverse("get_room"), {"code": room.code})

    assert response.status_code == 200
    assert response.json()["code"] == room.code

@pytest.mark.django_db
def test_get_room_invalid(api_client): #works
    response = api_client.get(reverse("get_room"), {"id": 9999})

    assert response.status_code == 400

@pytest.mark.django_db
def test_add_room(api_client, floor): #failed
    url = reverse("add_room")
    payload = {
        "number": 2,
        "floor": floor.code,
        "code": "R2",
        "type": ["Room Type 1"]
    }

    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Room.objects.filter(code="R2").exists()

@pytest.mark.django_db
def test_add_room_invalid(api_client):
    response = api_client.post(reverse("add_room"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_room(api_client, room): #works
    url = reverse("remove_room")
    payload = {"id": room.id}

    response = api_client.delete(url, data=payload, format="json")

    assert response.status_code == 200
    assert not Room.objects.filter(id=room.id).exists()

@pytest.mark.django_db
def test_remove_room_invalid(api_client):
    response = api_client.delete(reverse("remove_room"), {"id": 9999}, format="json")
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_room(api_client, room): #Failed
    url = reverse("modify_room")
    payload = {
        "id": room.id,
        "number": 3,
        "code": "R3"
    }

    response = api_client.put(url, data=payload, format="json")

    assert response.status_code == 200
    assert response.json()["number"] == "3"
    assert response.json()["code"] == "R3"

@pytest.mark.django_db
def test_modify_room_invalid(api_client): #works
    response = api_client.put(reverse("modify_room"), {"id": 9999, "name": "Room 3"})
    assert response.status_code == 404

@pytest.fixture
def amenities(db):
    return AmenityType.objects.create(name="Amenity Type 1")

@pytest.fixture
def inside_poi(db, floor, amenities):
    poi = InsidePOI.objects.create(
        floor = floor,
        x_coor = 100,
        y_coor = 200,
        opening_hours={"open_hour": "09:00", "closed_hour": "17:00"}
    )
    poi.amenities.add(amenities)
    return poi

@pytest.mark.django_db
def test_get_all_inside_pois(api_client, inside_poi): #works
    url = reverse("get_all_insidepois")
    response = api_client.get(url)
    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_get_inside_poi_by_id(api_client, inside_poi):
    url = reverse("get_insidepoi"), {"id": inside_poi.id}
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["id"] == inside_poi.id

@pytest.mark.django_db
def test_get_insidepoi_invalid_id(api_client):
    response = api_client.get(reverse("get_insidepoi"), {"id": 999})
    assert response.status_code == 400

@pytest.mark.django_db
def test_add_insidepoi(api_client, floor, amenity_type):
    url = reverse("add_insidepoi")
    payload = {
        "floor": floor.code,
        "amenities": ["Test Amenity"],
        "x_coor": 150,
        "y_coor": 250,
        "opening_hours": {"open_hour": "08:00", "closed_hour": "18:00"}
    }
    response = api_client.post(url, data=payload, format="json")
    assert response.status_code == 201
    assert InsidePOI.objects.filter(x_coor=150).exists()

@pytest.mark.django_db
def test_add_insidepoi_invalid(api_client):
    response = api_client.post(reverse("add_insidepoi"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_insidepoi(api_client, inside_poi):
    url = reverse("remove_insidepoi")
    response = api_client.delete(url, {"id": inside_poi.id}, format="json")
    assert response.status_code == 200
    assert not InsidePOI.objects.filter(id=inside_poi.id).exists()

@pytest.mark.django_db
def test_remove_insidepoi_invalid(api_client):
    response = api_client.delete(reverse("remove_insidepoi"), {"id": 999}, format="json")
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_insidepoi(api_client, inside_poi, amenity_type):
    url = reverse("modify_insidepoi")
    payload = {
        "id": inside_poi.id,
        "x_coor": 200,
        "amenities": ["Test Amenity", "New Amenity"]
    }
    AmenityType.objects.create(name="New Amenity")
    response = api_client.put(url, data=payload, format="json")
    assert response.status_code == 200
    inside_poi.refresh_from_db()
    assert inside_poi.x_coor == 200
    assert inside_poi.amenities.count() == 2