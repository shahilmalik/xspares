from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Count
from .models import Car, Item, VendorItem, Review, EmailOTP
from .serializers import ItemSerializer, CarModelSerializer, RegisterUserSerializer, VendorProfileSerializer, StaffProfileSerializer, ModelSerializer, MakeSerializer, VariantSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.mail import send_mail
from django.utils.timezone import now, timedelta
import random
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.utils import timezone
from django.conf import settings


@swagger_auto_schema(
    tags=["Login and Signup"],
    method="POST",
    request_body=RegisterUserSerializer,
    responses={200: "Profile created succesfully.", 400: "Error creaing a profile."},
)
@api_view(["POST"])
def register_user(request):
    email = request.data.get("email")

    try:
        email_otp = EmailOTP.objects.get(email=email)
    except EmailOTP.DoesNotExist:
        return Response({"error": "Email is not verified."}, status=status.HTTP_400_BAD_REQUEST)

    if not email_otp.is_verified:
        return Response({"error": "Please verify your email before registering."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        email_otp.delete()  # Remove the verified OTP record
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    tags=["Login and Signup"],
    method="POST",
    request_body=RegisterUserSerializer,
    responses={200: "Vendor registered successfully", 400: "Email is not verified"},
)
@api_view(["POST"])
def register_vendor(request):
    email = request.data.get("email")

    try:
        email_otp = EmailOTP.objects.get(email=email)
    except EmailOTP.DoesNotExist:
        return Response({"error": "Email is not verified."}, status=status.HTTP_400_BAD_REQUEST)

    if not email_otp.is_verified:
        return Response({"error": "Please verify your email before registering."}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure role is set to 'vendor'
    request.data['role'] = 'vendor'

    serializer = RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Create vendor profile using VendorProfileSerializer
        vendor_profile_serializer = VendorProfileSerializer(
            data=request.data, context={"user": user}
        )
        if vendor_profile_serializer.is_valid():
            vendor_profile_serializer.save(user=user)
            email_otp.delete()  # Remove the verified OTP record
            return Response({"message": "Vendor registered successfully!"}, status=status.HTTP_201_CREATED)
        else:
            user.delete()  # Rollback user creation if vendor profile fails
            return Response(vendor_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    tags=["Login and Signup"],
    method="POST",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description="registration email")
        },
    ),
    responses={200: "OTP sent successfully!", 400: "Email is required"},
)
@api_view(["POST"])
def send_otp(request):
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    otp = f"{random.randint(100000, 999999)}"

    email_otp, created = EmailOTP.objects.update_or_create(
        email=email,
        defaults={
            "otp": otp,
            "is_verified": False,
            "expires_at": timezone.now() + timedelta(minutes=10)  # Set the expiry time
        }
    )

    # Send OTP via email
    try:
        message = Mail(
            subject="Verify Your Email - OTP",
            html_content=f"Hello,\n\nYour OTP is {otp}. It is valid for 10 minutes.\n\nThank you.",
            from_email=settings.FROM_EMAIL,
            to_emails=email,
        )
        api_key = settings.SENDGRID_API_KEY
        sg = SendGridAPIClient(api_key)
        sg.send(message)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "OTP sent successfully!"}, status=status.HTTP_200_OK)

@swagger_auto_schema(
    tags=["Login and Signup"],
    method="POST",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, description="registration email"),
            'OTP': openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
    responses={200: "Vendor registered successfully", 400: "Email is not verified"},
)
@api_view(["POST"])
def verify_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response({"error": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        email_otp = EmailOTP.objects.get(email=email)
    except EmailOTP.DoesNotExist:
        return Response({"error": "Invalid email or OTP"}, status=status.HTTP_400_BAD_REQUEST)

    if email_otp.otp != otp:
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

    if email_otp.expires_at < now():
        return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)

    email_otp.is_verified = True
    email_otp.save()

    return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)



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
    data = request.query_params
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

@swagger_auto_schema(
    tags=["Dropdown"],
    method="GET"
)
@api_view(['GET'])
def get_makes(request):
    makes = Car.objects.values_list("brand", flat=True).distinct()
    return Response(makes)

@swagger_auto_schema(
    tags=["Dropdown"],
    method="GET"
)
@api_view(['GET'])
def get_models_by_make(request):
    make = request.query_params.get("make")
    if not make:
        return Response({"error": "Make is required"}, status=400)

    models = Car.objects.filter(brand=make).values_list("model", flat=True).distinct()
    return Response(models)

@swagger_auto_schema(
    tags=["Dropdown"],
    method="GET"
)
@api_view(['GET'])
def get_variants_by_model(request):
    make = request.query_params.get("make")
    model = request.query_params.get("model")
    if not model or not make:
        return Response({"error": "Make or Model is missing"}, status=400)

    variants = Car.objects.filter(brand=make,model=model).values_list("variant", flat=True)
    return Response(variants)