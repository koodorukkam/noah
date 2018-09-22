from uuid import uuid4
from datetime import timedelta
from random import randint

from django.utils import timezone

from ..models.user import UserProfileModel, TokenModel
from ..constants.choices import UserTokenType


class AuthenticationService(object):
    VALIDATION_TOKEN_EXPIRY_IN_SECONDS = 10 * 60
    ACCESS_TOKEN_EXPIRY_IN_SECONDS = 7 * 24 * 60 * 60

    def generate_verification_token(self, profile):
        return profile.tokenmodel_set.create(
            token=str(randint(100000, 999999)),
            kind=UserTokenType.VERIFICATION.value,
            expires_at=timezone.now() + timedelta(seconds=self.VALIDATION_TOKEN_EXPIRY_IN_SECONDS))

    def generate_access_token(self, profile):
        return profile.tokenmodel_set.create(
            token=str(uuid4()),
            kind=UserTokenType.ACCESS.value,
            expires_at=timezone.now() + timedelta(seconds=self.ACCESS_TOKEN_EXPIRY_IN_SECONDS))

    def find_or_create_profile(self, number):
        return UserProfileModel.objects.filter(number=number).first() or \
            UserProfileModel.objects.create(number=number)

    def validate_token(self, token):
        if not token:
            raise Exception("Invalid token")
        
        if token.expires_at < timezone.now():
            raise Exception("Your token has expired, please request again")

        return token

    def validate_verification_token(self, number, otp):
        token = TokenModel.objects.filter(
            token=otp,
            kind=UserTokenType.VERIFICATION.value,
            profile__number=number).last()
        
        return self.validate_token(token)

    def validate_access_token(self, tokenString):
        token = TokenModel.objects.filter(
            token=tokenString,
            kind=UserTokenType.ACCESS.value)

        return self.validate_token(token)
