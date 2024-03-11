from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import viewsets, permissions
from auth.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TestPublicView(viewsets.ViewSet):
    def list(self, request):
        return JsonResponse({"message": "Hello World!"})


class TestAuthenticatedUserView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        return JsonResponse({"message": "Hello User!"})


class TestAuthenticatedStaffView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def list(self, request):
        return JsonResponse({"message": "Hello Staff!"})
