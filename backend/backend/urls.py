
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

from asset import views as asset_views
from asset.views import asset_usage_count

router = routers.DefaultRouter()
router.register(r'assets', asset_views.AssetViewSet)
router.register(r'tags', asset_views.TagViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('tag-usage/', asset_usage_count, name="tag-usage")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)