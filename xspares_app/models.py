from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    is_vendor = models.BooleanField(default=False)  # To distinguish vendors from customers

    def __str__(self):
        return self.username


class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addresses')
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)  # For marking the default address

    def __str__(self):
        return f"{self.address_line_1}, {self.city}, {self.country}"
    

class VendorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='vendor_profile')
    business_name = models.CharField(max_length=255)
    gst_number = models.CharField(max_length=50, null=True, blank=True)
    store_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.business_name


class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    variant = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.brand} {self.model} {self.variant}"


class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    part_number = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.part_number}"


class Compatibility(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='compatible_cars')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='compatible_items')

    def __str__(self):
        return f"{self.item.name} compatible with {self.car}"


class VendorItem(models.Model):
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name='vendor_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='vendors')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.vendor.business_name} - {self.item.name}"

    def average_rating(self):
        reviews = self.reviews.all()  # Related name from Review
        if reviews.exists():
            return reviews.aggregate(models.Avg('rating'))['rating__avg']
        return None
    

class Review(models.Model):
    vendor_item = models.ForeignKey(
        VendorItem, on_delete=models.CASCADE, related_name='reviews'
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField()  
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.vendor_item} by {self.user.username}"
