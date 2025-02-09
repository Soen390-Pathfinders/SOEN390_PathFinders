import pytest
import json
from django.urls import reverse
from app.models import Building, Campus, Floor, PointOfInterest, Room, User


@pytest.mark.django_db  # This is a marker that tells pytest to use the database for the test
def test_hello_view(client):
    """
    Test that the hello view returns the correct data for the first building.
    """
    # Set up: Create a sample building
    building = Building.objects.create(name="Main Building", number_of_floors=5)
    url = reverse('hello')  # Assuming 'hello' is the name of your view endpoint

    # Send GET request to the endpoint
    response = client.get(url)
    
    # Assert that the response status code is 200
    assert response.status_code == 200

    # Assert that the response data matches the building's data
    assert response.json() == {'name': 'Main Building', 'floors': 5}


@pytest.mark.django_db
def test_hello_no_buildings(client):
    """
    Test that the hello view handles the case where no buildings are available.
    """
    # Set up: Ensure no buildings are in the database
    Building.objects.all().delete()
    url = reverse('hello')  # Assuming 'hello' is the name of your view endpoint

    # Send GET request to the endpoint
    response = client.get(url)

    # Assert that the response status code is 404
    assert response.status_code == 404

    # Assert that the response contains the correct message
    assert response.json() == {'message': 'No buildings found'}

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