from django.urls import path
from .views import (get_items_by_car, register_user, send_otp, verify_otp, 
                    register_vendor, get_makes, get_models_by_make, get_variants_by_model)
urlpatterns = [
    path('register-user/',register_user,name="register-user"),
    path('register-vendor/',register_vendor,name="register-vendor"),
    path('send-otp/',send_otp,name="send-otp"),
    path('verify-otp/',verify_otp,name="verify-otp"),
    path('get-items-by-car/',get_items_by_car,name="get-items-by-car"),
    path('get-makes/',get_makes,name="get-makes"),
    path('get-models-by-make/',get_models_by_make,name="get-models-by-make"),
    path('get-variants-by-model/',get_variants_by_model,name="get-variants-by-car"),
]

