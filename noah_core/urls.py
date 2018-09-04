from django.urls import path

from .views import InitView, DonationView, ExportView

urlpatterns = [
    path('init/', InitView.as_view()),
    path('donation.register/', DonationView.as_view()),

    path('export.donations/', ExportView.as_view(), name="donations-export")
]
