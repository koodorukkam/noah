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
from ..services.auth import AuthenticationService


authService = AuthenticationService()


class RequestOTP(View):
    def post(self, request):
        resp = {
            "msg": "Something went wrong",
            "code": 500,
            "request": {
                "number": request.POST.get('number') or ""
            }
        }

        try:
            validators.is_valid_phone_number(resp["request"]["number"])

            profile = authService.find_or_create_profile(resp["request"]["number"])
            token = authService.generate_verification_token(profile)

            resp["profile"] = profile.serialize()
            resp["token"] = token.serialize()

            resp["msg"] = "Ok"
            resp["code"] = 200
        
        except Exception as e:
            resp["msg"] = str(e)

        return JsonResponse(resp, status=resp["code"])


class Login(View):
    def post(self, request):
        resp = {
            "msg": "Something went wrong",
            "code": 500,
            "request": {
                "number": request.POST.get('number') or "",
                "otp": request.POST.get("otp") or ""
            }
        }

        try:
            token = authService.validate_verification_token(
                number=resp["request"]["number"],
                otp=resp["request"]["otp"])
            
            resp["access_token"] = authService.generate_access_token(token.profile).serialize()
            token.delete()

            resp["msg"] = "Ok"
            resp["code"] = 200
        
        except Exception as e:
            resp["msg"] = str(e)

        return JsonResponse(resp, status=resp["code"])
