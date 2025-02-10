import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from app.models import Campus

@pytest.fixture
def api_client():
    return APIClient()

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

