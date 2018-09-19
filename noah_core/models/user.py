from django.db import models
from django.contrib.auth.models import User

from ..constants.choices import enumToChoices, UserTokenType


class UserProfileModel(models.Model):
    number = models.CharField(max_length=10)
    is_number_verified = models.BooleanField(default=False)

    # Using this model instead of foreign keys
    # will remove our ability to track meta-info
    # such as who the granter of permission was for this
    # user, when was it granted etc.
    is_super = models.BooleanField(default=False)
    is_access_controler = models.BooleanField(default=False)
    # More roles will be added in future migrations

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class TokenModel(models.Model):
    token = models.CharField(max_length=250)
    kind = models.IntegerField(
        choices=enumToChoices(UserTokenType))

    profile = models.ForeignKey(UserProfileModel,
        on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
