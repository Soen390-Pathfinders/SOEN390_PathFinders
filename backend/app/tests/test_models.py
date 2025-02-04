import pytest
from django.db.utils import IntegrityError
from app.models import Building

@pytest.fixture
@pytest.mark.django_db
def building():
    return Building.objects.create(name="Building 1", number_of_floors=5, location="Main Campus")

@pytest.mark.django_db
def test_building_creation(building):
    assert building.id is not None
    assert building.name == "Building 1"
    assert building.number_of_floors == 5
    assert building.location == "Main Campus"

@pytest.mark.django_db
def test_building_str_method(building):
    assert str(building) == "Building 1"

@pytest.mark.django_db
def test_building_field_constraints():
    #ensures that the name field is required (cannot be None)
    with pytest.raises(IntegrityError):
        Building.objects.create(name=None, number_of_floors=3, location="Central Campus")