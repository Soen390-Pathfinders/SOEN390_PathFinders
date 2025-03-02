import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from app.models import Building, Campus, Floor, Room, InsidePOI

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
def test_get_all_buildings(api_client, building):
    response = api_client.get(reverse("get_all_buildings"))
    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_get_building_by_code(api_client, building):
    url = reverse("get_building") + "?code=B1"
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["code"] == "B1"

@pytest.mark.django_db
def test_get_building_by_name(api_client, building):
    url = reverse("get_building") + "?name=Building 1"
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data["name"] == "Building 1"

@pytest.mark.django_db
def test_get_building_invalid(api_client):
    response = api_client.get(reverse("get_building"), {"id": 9999})
    assert response.status_code == 400

@pytest.mark.django_db
def test_add_building(api_client):
    url = reverse("add_building")
    payload = {
        "name": "Building 2",
        "code": "B2"
    }
    response = api_client.post(url, data=payload, format="json")
    assert response.status_code == 201
    assert 'building_id' in response.data

@pytest.mark.django_db
def test_add_building_invalid(api_client):
    response = api_client.post(reverse("add_building"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_building(api_client, building):
    url = reverse("remove_building")
    payload = {"code": building.code}   
    response = api_client.delete(url, data=payload, format="json")
    assert response.status_code == 200
    assert not Building.objects.filter(code=building.code).exists()

@pytest.mark.django_db
def test_remove_building_invalid(api_client):
    response = api_client.delete(reverse('remove_building'), {'id': 9999}, format='json')
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_building(api_client, building):
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
def test_modify_building_invalid(api_client):
    response = api_client.put(reverse("modify_building"), {"id": 9999, "name": "Building 3"})
    assert response.status_code == 404 

@pytest.fixture
def create_campus(db):
    Campus.objects.create(name="Campus A", code= "A", latitude=-40.37402, longitude= 30.028945)
    Campus.objects.create(name="Campus B", code="B")
    Campus.objects.create(name="Campus George Alex Smith", code="GAS", latitude=32.45908)
    return

@pytest.mark.django_db
def test_get_all_campuses(api_client, create_campus):
    url = reverse("get_all_campuses")  # Ensure you have a URL name for your campus list view
    response = api_client.get(url)
    
    assert response.status_code == 200
    assert len(response.data) == 3

@pytest.mark.django_db
def test_get_campus_by_code(api_client, create_campus):
    url = reverse("get_campus") + "?code=A"
    response = api_client.get(url)

    assert response.status_code == 200
    assert response.json()["name"] == "Campus A"
    assert response.json()["code"] == "A"

@pytest.mark.django_db
def test_add_campus(api_client):
    url = reverse("add_campus")  # Ensure you have this route defined
    payload = {
        "name": "New Campus",
        "code": "NEW"
    }
    
    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Campus.objects.filter(code="NEW").exists()

@pytest.mark.django_db
def test_delete_campus(api_client, create_campus):
    url = reverse("remove_campus")
    payload = {"code": "GAS"}

    response = api_client.delete(url, data=payload, format="json")

    assert response.status_code == 200
    assert not Campus.objects.filter(code="GAS").exists() 

@pytest.fixture
def floor(db, building):
    return Floor.objects.create(name="Floor 1", code="F1", building=building)

@pytest.mark.django_db
def test_get_all_floors(api_client, floor):
    url = reverse("get_all_floors")
    response = api_client.get(url)

    assert response.status_code == 200
    assert len(response.data) > 0

@pytest.mark.django_db
def test_get_floor_by_name(api_client, floor):
    response = api_client.get(reverse("get_floor"), {"name": floor.name})

    assert response.status_code == 200
    assert response.json()["name"] == floor.name

@pytest.mark.django_db
def test_get_floor_by_code(api_client, floor):
    response = api_client.get(reverse("get_floor"), {"code": floor.code})

    assert response.status_code == 200
    assert response.json()["code"] == floor.code

@pytest.mark.django_db
def test_get_floor_invalid(api_client):
    response = api_client.get(reverse("get_floor"), {"id": 9999})

    assert response.status_code == 400

@pytest.mark.django_db
def test_add_floor(api_client, floor):
    building = Building.objects.create(name="Building 1", code="B1")
    url = reverse("add_floor")
    payload = {
        "name": "Floor 2",
        "code": "F2",
        "building": building.id
    }

    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Floor.objects.filter(code="F2").exists()

@pytest.mark.django_db
def test_add_floor_invalid(api_client):
    response = api_client.post(reverse("add_floor"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_floor(api_client, floor):
    url = reverse("remove_floor")
    payload = {"id": floor.id}

    response = api_client.delete(url, data=payload, format="json")

    assert response.status_code == 200
    assert not Floor.objects.filter(id=floor.id).exists()

@pytest.mark.django_db
def test_remove_floor_invalid(api_client):
    response = api_client.delete(reverse("remove_floor"), {"id": 9999}, format="json")
    assert response.status_code == 404

@pytest.mark.django_db
def test_modify_floor(api_client, floor):
    url = reverse("modify_floor")
    payload = {
        "id": floor.id,
        "name": "Floor 3",
        "code": "F3"
    }

    response = api_client.put(url, data=payload, format="json")

    assert response.status_code == 200
    assert response.json()["name"] == "Floor 3"
    assert response.json()["code"] == "F3"

@pytest.mark.django_db
def test_modify_floor_invalid(api_client):
    response = api_client.put(reverse("modify_floor"), {"id": 9999, "name": "Floor 3"})
    assert response.status_code == 404

@pytest.fixture
def room(db, floor, building):
    return Room.objects.create(name="Room 1", code="R1", floor=floor)
    
@pytest.mark.django_db
def test_get_all_rooms(api_client, room):
    response = api_client.get(reverse("get_all_rooms"))

    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_get_room_by_code(api_client, room):
    response = api_client.get(reverse("get_room"), {"code": room.code})

    assert response.status_code == 200
    assert response.json()["code"] == room.code

@pytest.mark.django_db
def test_get_room_by_name(api_client, room):
    response = api_client.get(reverse("get_room"), {"name": room.name})

    assert response.status_code == 200
    assert response.json()["name"] == room.name

@pytest.mark.django_db
def test_get_room_invalid(api_client):
    response = api_client.get(reverse("get_room"), {"id": 9999})

    assert response.status_code == 400

@pytest.mark.django_db
def test_add_room(api_client, floor):
    url = reverse("add_room")
    payload = {
        "name": "Room 2",
        "code": "R2",
        "floor": floor.id
    }

    response = api_client.post(url, data=payload, format="json")

    assert response.status_code == 201
    assert Room.objects.filter(code="R2").exists()

@pytest.mark.django_db
def test_add_room_invalid(api_client):
    response = api_client.post(reverse("add_room"), {})
    assert response.status_code == 400

@pytest.mark.django_db
def test_remove_room(api_client, room):
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
def test_modify_room(api_client, room):
    url = reverse("modify_room")
    payload = {
        "id": room.id,
        "name": "Room 3",
        "code": "R3"
    }

    response = api_client.put(url, data=payload, format="json")

    assert response.status_code == 200
    assert response.json()["name"] == "Room 3"
    assert response.json()["code"] == "R3"

@pytest.mark.django_db
def test_modify_room_invalid(api_client):
    response = api_client.put(reverse("modify_room"), {"id": 9999, "name": "Room 3"})
    assert response.status_code == 404

@pytest.fixture
def inside_poi(db, building, floor, room):
    return InsidePOI.objects.create(name="InsidePOI 1", code="I1", room=room)
