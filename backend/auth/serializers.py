from typing import Any, Dict
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenVerifySerializer,
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "is_staff"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        user_serializer = UserSerializer(self.user)
        data.update({"user": user_serializer.data})

        return data


class CustomTokenVerifySerializer(TokenVerifySerializer):

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        user = self.get_user_from_token(attrs.get("token"))

        user_serializer = UserSerializer(user)
        data.update({"user": user_serializer.data})

        return data

    @staticmethod
    def get_user_from_token(token):
        authentication = JWTAuthentication()
        try:
            validated_token = authentication.get_validated_token(token)
            user = authentication.get_user(validated_token)
            return user
        except:
            return None
