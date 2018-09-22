from uuid import uuid4
from datetime import timedelta
from random import randint
from functools import wraps

from django.utils import timezone
from django.http import JsonResponse

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

    def validate_token(self, qs, tokenString):
        token = qs.filter(token=tokenString).last()

        if not token:
            raise Exception("Invalid token - (%s)" % tokenString)

        token.raise_exception_if_expired()
        return token

    def validate_verification_token(self, number, otp):
        qs = TokenModel.objects.filter(
            kind=UserTokenType.VERIFICATION.value,
            profile__number=number)
        return self.validate_token(qs, otp)

    def validate_access_token(self, tokenString):
        qs = TokenModel.objects.filter(
            kind=UserTokenType.ACCESS.value)
        return self.validate_token(qs, tokenString)

    def is_authenticated_request(self, func):
        @wraps(func)
        def wrapper(view, request, *args, **kwargs):
            try:
                tokenString = request.META\
                    .get('HTTP_AUTHORIZATION', '')\
                    .replace("Bearer", "").strip()

                token = self.validate_access_token(tokenString)
                kwargs["profile"] = token.profile

            except Exception as e:
                return JsonResponse({
                    "code": 403,
                    "msg": str(e)
                }, status=403)

            return func(view, request, *args, **kwargs)

        return wrapper
