from django.urls import path
from .views import get_items_by_car
urlpatterns = [
    path('get-items-by-car/',get_items_by_car,name="get-items-by-car")
]

