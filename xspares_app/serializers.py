from rest_framework import serializers
from django.db.models import Avg, Count
from .models import Item, VendorItem, Review, Car, CustomUser, VendorProfile, Staff
from django.contrib.auth.password_validation import validate_password


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES, default='user')

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'date_of_birth', 'password', 'confirm_password', 'role']

    def validate_password(self, value):
        """Validate the password for strength using Django's built-in validation."""
        validate_password(value)  # Use Django's validators
        return value
    def validate(self, data):
        # Ensure passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class VendorProfileSerializer(serializers.ModelSerializer):
    user = RegisterUserSerializer()
    gst_number = serializers.CharField(required=True)

    class Meta:
        model = VendorProfile
        fields = ['user', 'business_name', 'gst_number', 'store_url']

    def create(self, validated_data):
        """
        Handle creation of VendorProfile along with associated CustomUser.
        """
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data, role=CustomUser.VENDOR)
        vendor_profile = VendorProfile.objects.create(user=user, **validated_data)
        return vendor_profile


class StaffProfileSerializer(serializers.ModelSerializer):
    user = RegisterUserSerializer()

    class Meta:
        model = Staff
        fields = ['user', 'staff_number', 'role']

    def create(self, validated_data):
        """
        Handle creation of StaffProfile along with associated CustomUser.
        """
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data, role=CustomUser.STAFF)
        staff_profile = Staff.objects.create(user=user, **validated_data)
        return staff_profile
    

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


class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class MakeSerializer(serializers.Serializer):
    make = serializers.CharField()

class ModelSerializer(serializers.Serializer):
    model = serializers.CharField()

class VariantSerializer(serializers.Serializer):
    variant = serializers.CharField()