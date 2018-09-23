from django.urls import path

from ..views import auth

# All legacy URL patterns
urlpatterns = [
    path('auth.requestOTP', auth.RequestOTP.as_view()),
    path('auth.login', auth.Login.as_view()),

    path('user.me', auth.CurrentUser.as_view())
]
