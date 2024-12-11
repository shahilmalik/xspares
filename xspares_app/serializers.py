from rest_framework import serializers
from django.db.models import Avg, Count
from .models import Item, VendorItem, Review


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'part_number', 'price', 'stock']

    def to_representation(self, instance):
        # Get the default representation
        representation = super().to_representation(instance)

        # Calculate average rating for the item across all vendors
        avg_rating = Review.objects.filter(vendor_item__item=instance).aggregate(
            average_rating=Avg('rating')
        )['average_rating']
        representation['average_rating'] = avg_rating or 0  # Default to 0 if no reviews

        # Count the number of vendors selling this item
        vendor_count = VendorItem.objects.filter(item=instance).count()
        representation['vendor_count'] = vendor_count

        return representation
