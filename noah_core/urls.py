from django.urls import path

from .views import InitView, DonationView

urlpatterns = [
    path('init/', InitView.as_view()),
    path('donation.register/', DonationView.as_view())
]
