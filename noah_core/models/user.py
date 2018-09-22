from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from ..constants.choices import enumToChoices, UserTokenType


class UserProfileModel(models.Model):
    number = models.CharField(max_length=10)
    is_number_verified = models.BooleanField(default=False)

    # Using this model instead of foreign keys
    # will remove our ability to track meta-info
    # such as who the granter of permission was for this
    # user, when was it granted etc.
    is_super = models.BooleanField(default=False)
    is_access_controller = models.BooleanField(default=False)
    # More roles will be added in future migrations

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "number": self.number,
            "is_number_verified": self.is_number_verified,
            "is_super": self.is_super,
            "is_access_controller": self.is_access_controller,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }


class TokenModel(models.Model):
    token = models.CharField(max_length=250)
    kind = models.IntegerField(
        choices=enumToChoices(UserTokenType))

    profile = models.ForeignKey(UserProfileModel,
        on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def raise_exception_if_expired(self):
        if self.expires_at < timezone.now():
            raise Exception("Your token has expired at %s" % self.expires_at.isoformat())

    def serialize(self):
        return {
            "token": self.token,
            "kind": self.kind,
            "profile_id": self.profile.id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "expires_at": self.expires_at.isoformat()
        }
