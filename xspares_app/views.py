from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Count
from .models import Car, Item, VendorItem, Review
from .serializers import ItemSerializer, CarModelSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    tags=["Home"],
    method="GET",
    query_serializer=CarModelSerializer,
    responses={200: "Data fetched successfully.", 404: "Car not found."},
)
@api_view(["GET"])
def get_items_by_car(request):
    """
    API to retrieve items based on car brand, model, and variant.
    """
    data = request.data
    brand = data.get("brand")
    model = data.get("model")
    variant = data.get("variant")

    if not all([brand, model, variant]):
        return Response(
            {"error": "brand, model, and variant are required fields."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Fetch the car instance
        car = Car.objects.get(brand=brand, model=model, variant=variant)
    except Car.DoesNotExist:
        return Response({"error": "Car not found."}, status=status.HTTP_404_NOT_FOUND)

    # Fetch compatible items for the car
    compatible_items = Item.objects.filter(compatible_cars__car=car)

    if not compatible_items.exists():
        return Response(
            {"message": "No items available for the specified car."},
            status=status.HTTP_200_OK,
        )

    # Serialize the items
    item_serializer = ItemSerializer(compatible_items, many=True)
    return Response(item_serializer.data, status=status.HTTP_200_OK)

