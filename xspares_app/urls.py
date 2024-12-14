from django.urls import path
from .views import get_items_by_car, register_user, send_otp, verify_otp, register_vendor
urlpatterns = [
    path('register-user/',register_user,name="register-user"),
    path('register-vendor/',register_vendor,name="register-vendor"),
    path('send-otp/',send_otp,name="send-otp"),
    path('verify-otp/',verify_otp,name="verify-otp"),
    path('get-items-by-car/',get_items_by_car,name="get-items-by-car"),
]

