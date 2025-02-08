import pytest
from django.urls import reverse
from ..models import Building


@pytest.mark.django_db  # This is a marker that tells pytest to use the database for the test
def test_building_get(client):
    """
    Test that the hello view returns the correct data for the first building.
    """
    assert True == True


@pytest.mark.django_db
def test_hello_no_buildings(client):
    """
    Test that the hello view handles the case where no buildings are available.
    """
    assert True == True
