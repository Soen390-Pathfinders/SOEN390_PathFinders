import pytest
import json
from django.urls import reverse
from app.models import Building, Campus, Floor, PointOfInterest, Room, User

@pytest.mark.django_db
def test_building_get(client):
    building = Building.objects.create(name="Main Building")
    url = reverse('building_get', args=[building.name])
    response = client.get(url)

    assert response.status_code == 200

    data = json.loads(response.content)
    assert "Main Building" in response.content.decode()

@pytest.mark.django_db
def test_building_delete(client):
    pass

@pytest.mark.django_db
def test_building_update(client):
    pass

@pytest.mark.django_db
def test_building_get_coordinates(client):
    pass

@pytest.mark.django_db
def test_camput_list(client):
    pass

@pytest.mark.django_db
def test_campus_get(client):
    pass

@pytest.mark.django_db
def test_campus_create(client):
    pass

@pytest.mark.django_db
def test_campus_delete(client):
    pass

@pytest.mark.django_db
def test_campus_update(client):
    pass

@pytest.mark.django_db
def test_floor_list(client):
    pass

@pytest.mark.django_db
def test_floor_detail(client):
    pass

@pytest.mark.django_db
def test_floor_create(client):
    pass

@pytest.mark.django_db
def test_floor_update(client):
    pass    

@pytest.mark.django_db
def test_floor_delete(client):
    pass

@pytest.mark.django_db
def test_pointOfInterest_list(client):
    pass

@pytest.mark.django_db
def test_pointOfInterest_get(client):
    pass

@pytest.mark.django_db
def test_pointOfInterest_create(client):
    pass

@pytest.mark.django_db
def test_pointOfInterest_delete(client):
    pass

@pytest.mark.django_db
def test_pointOfInterest_update(client):
    pass

@pytest.mark.django_db
def test_room_list(client):
    pass

@pytest.mark.django_db
def test_room_detail(client):
    pass

@pytest.mark.django_db
def test_room_create(client):
    pass

@pytest.mark.django_db
def test_room_update(client):
    pass

@pytest.mark.django_db
def test_room_delete(client):
    pass

@pytest.mark.django_db
def test_user_list(client):
    pass

@pytest.mark.django_db
def test_user_get(client):
    pass

@pytest.mark.django_db
def test_user_create(client):
    pass

@pytest.mark.django_db
def test_user_delete(client):
    pass

@pytest.mark.django_db
def test_user_update(client):
    pass
