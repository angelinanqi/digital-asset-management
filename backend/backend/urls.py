from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

from user.views import NewTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from user import views as user_views
from asset import views as asset_views
from asset.views import (
    asset_usage_count,
    clear_all_tags,
    get_new_version_no,
    get_all_file_versions,
    delete_asset_by_code,
)

router = routers.DefaultRouter()
router.register(r"users", user_views.UserViewSet)
router.register(r"groups", user_views.GroupViewSet)
router.register(r"assets", asset_views.AssetViewSet)
router.register(r"tags", asset_views.TagViewSet)

urlpatterns = [
    path("api/token/", NewTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("api-auth", include("rest_framework.urls", namespace="rest_framework")),
    path("tag-usage/", asset_usage_count, name="tag-usage"),
    path("clear-tags/<uuid:asset_id>/", clear_all_tags),
    path("get-new-version-no/<str:asset_code>/", get_new_version_no),
    path("get-all-file-versions/<str:asset_code>/", get_all_file_versions),
    path("delete-asset-by-code/<str:asset_code>/", delete_asset_by_code),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
