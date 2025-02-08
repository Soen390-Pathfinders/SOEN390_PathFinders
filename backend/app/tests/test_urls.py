import pytest
from django.test import Client
from django.urls import reverse
from app.urls import urlpatterns
from app.views import hello, my_view

@pytest.mark.django_db
def test_hello_url():
    assert ('hello/', hello, 'hello') in urlpatterns

@pytest.mark.django_db
def test_my_view_url():
    assert ('test/', my_view, 'idk') in urlpatterns

@pytest.mark.django_db
def test_hello_url_response():
    client = Client()
    response = client.get(reverse("hello"))
    assert response.status_code == 200

@pytest.mark.django_db
def test_my_view_url_response():
    client = Client()
    response = client.get(reverse("idk"))
    assert response.status_code == 200
