import pytest
from django.urls import reverse
from ..models import Building


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
