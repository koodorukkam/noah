from django.urls import path

from .views import legacy

# All legacy URL patterns
urlpatterns = [
    path('init/', legacy.InitView.as_view()),
    path('donation.register/', legacy.DonationView.as_view()),
    path('export.donations/', legacy.ExportView.as_view(),
        name="donations-export")
]
