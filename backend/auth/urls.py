from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)

from .views import (
    TestAuthenticatedUserView,
    UserViewSet,
)

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, "user")
router.register(r"test-authenticated", TestAuthenticatedUserView, "test-authenticated")
router.register(
    r"test-authenticated-staff", TestAuthenticatedUserView, "test-authenticated-staff"
)
router.register(r"test-public", TestAuthenticatedUserView, "test-public")


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("token/obtain", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="token_verify"),
    path("token/blacklist", TokenBlacklistView.as_view(), name="token_blacklist"),
]
