from django.http import JsonResponse
from django.views import View
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

import json
from uuid import uuid4
from datetime import timedelta
from random import randint

from ..models.user import UserProfileModel, TokenModel
from ..constants.choices import UserTokenType
from ..services import validators


class RequestOTP(View):
    OTP_EXPIRY_SECONDS = 10 * 60

    def find_or_create_profile(self, number):
        return UserProfileModel.objects.filter(number=number).first() or \
            UserProfileModel.objects.create(number=number)

    def generate_otp(self, profile):
        return profile.tokenmodel_set.create(
            token=str(randint(100000, 999999)),
            kind=UserTokenType.VERIFICATION.value,
            expires_at=timezone.now() + timedelta(seconds=self.OTP_EXPIRY_SECONDS))

    def post(self, request):
        resp = {
            "msg": "Something went wrong",
            "status": 500,
            "request": {
                "number": request.POST.get('number') or ""
            }
        }

        try:
            validators.is_valid_phone_number(resp["request"]["number"])

            profile = self.find_or_create_profile(resp["request"]["number"])
            token = self.generate_otp(profile)

            resp["profile"] = profile.serialize()
            resp["token"] = token.serialize()

            resp["msg"] = "Ok"
            resp["status"] = 200
        
        except Exception as e:
            resp["msg"] = str(e)

        return JsonResponse(resp, status=resp["status"])


class Login(View):
    OTP_EXPIRY_SECONDS = 7 * 24 * 60 * 60

    def verify_token(self, number, otp):
        token = TokenModel.objects.filter(
            token=otp,
            kind=UserTokenType.VERIFICATION.value,
            profile__number=number).last()

        if not token:
            raise Exception("Invalid token/OTP")
        
        if token.expires_at < timezone.now():
            raise Exception("Your OTP has expired, please request again")

        return token

    def create_access_token(self, profile):
        return profile.tokenmodel_set.create(
            token=str(uuid4()),
            kind=UserTokenType.ACCESS.value,
            expires_at=timezone.now() + timedelta(seconds=self.OTP_EXPIRY_SECONDS))

    def post(self, request):
        resp = {
            "msg": "Something went wrong",
            "status": 500,
            "request": {
                "number": request.POST.get('number') or "",
                "otp": request.POST.get("otp") or ""
            }
        }

        try:
            token = self.verify_token(
                number=resp["request"]["number"],
                otp=resp["request"]["otp"])
            
            resp["access_token"] = self.create_access_token(token.profile).serialize()
            token.delete()

            resp["msg"] = "Ok"
            resp["status"] = 200
        
        except Exception as e:
            resp["msg"] = str(e)

        return JsonResponse(resp, status=resp["status"])
