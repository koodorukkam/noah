from django.db import models

from .user import UserProfileModel
from ..constants.choices import enumToChoices, \
    ReceiverRequestPostingForType, HubType, \
    VolunteerContributionType, VolunteerVehicleType


#@TODO - Add a lat/long option to the models
# having location fields

class StatusModel(models.Model):
    status = models.IntegerField()
    current = models.BooleanField(default=False)

    updated_by = models.ForeignKey(UserProfileModel,
        on_delete=models.SET_NULL, null=True, default=None)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class ReceiverRequestModel(models.Model):
    requester_full_name = models.CharField(max_length=250)
    requester_number = models.CharField(max_length=10)
    posting_for = models.IntegerField(
        choices=enumToChoices(ReceiverRequestPostingForType))

    description = models.TextField()
    damage_pic_url = models.CharField(max_length=250,
        null=True, blank=True)

    item_name = models.CharField(max_length=25)

    statuses = models.ManyToManyField(StatusModel)

    beneficiary_full_name = models.CharField(max_length=250)
    beneficiary_number = models.CharField(max_length=10)
    beneficiary_address = models.TextField()

    beneficiary_district = models.CharField(max_length=250)
    beneficiary_state = models.CharField(max_length=250)
    beneficiary_pincode = models.CharField(max_length=6)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class HubModel(models.Model):
    name = models.CharField(max_length=250)
    kind = models.IntegerField(
        choices=enumToChoices(HubType))

    address = models.TextField()
    district = models.CharField(max_length=250)
    state = models.CharField(max_length=250)
    pincode = models.CharField(max_length=6)

    map_url = models.TextField(null=True)

    # Using a manytomany field here will remove our
    # ability to track meta info such as who granted a user
    # the admin role, when was it granted etc
    admins = models.ManyToManyField(UserProfileModel,
        related_name="admins_set")
    volunteers = models.ManyToManyField(UserProfileModel,
        related_name="volunteers_set")

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class DonationModel(models.Model):
    item_name = models.CharField(max_length=250)
    item_pic_url = models.CharField(max_length=250,
        null=True, blank=True)

    donor_full_name = models.CharField(max_length=250)
    donor_contact_number = models.CharField(max_length=10)

    district = models.CharField(max_length=250)
    state = models.CharField(max_length=250)
    pincode = models.CharField(max_length=6)

    statuses = models.ManyToManyField(StatusModel)

    request_fulfilled = models.ForeignKey(ReceiverRequestModel,
        on_delete=models.SET_NULL, null=True)

    distribution_hub = models.ForeignKey(HubModel,
        on_delete=models.SET_NULL, null=True,
        related_name="distribution_hub_set")
    collection_hub = models.ForeignKey(HubModel,
        on_delete=models.SET_NULL, null=True,
        related_name="collection_hub_set")

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class VolunteerRequestModel(models.Model):
    profile = models.ForeignKey(UserProfileModel,
        on_delete=models.SET_NULL, null=True)

    full_name = models.CharField(max_length=250)
    number = models.CharField(max_length=10)
    email_address = models.CharField(max_length=250)

    district = models.CharField(max_length=250)
    state = models.CharField(max_length=250)
    pincode = models.CharField(max_length=6)

    statuses = models.ManyToManyField(StatusModel)

    contribution_type = models.IntegerField(
        choices=enumToChoices(VolunteerContributionType))
    vehicle_type = models.IntegerField(
        choices=enumToChoices(VolunteerVehicleType))
