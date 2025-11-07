from django.shortcuts import render
from .models import Asset, Tags
from .serializers import AssetSerializer, TagSerializer
from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count


# Create your views here.
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    parser_classes = [MultiPartParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description", "file_type"]

    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description", "upload_datetime", "file_type"]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer


@api_view(["GET"])
def asset_usage_count(request):
    """
    return payload which has:
    - tag id
    - tag title
    - usage count (how many assets are linked to each tag)

    usage_count is calculated from the reverse relation: Tag -> assets
    (related_name in Asset.tags ManyToManyField)
    """
    data = Tags.objects.annotate(usage_count=Count("assets")).values(
        "id", "title", "usage_count"
    )
    return Response(data)


@api_view(["PATCH"])
def clear_all_tags(request, asset_id):
    """
    clear tags list of an asset.
    returns payload which has:
    - an empty list []

    workaround to support tags field in Asset, where M2M field cannot be None
    """
    asset = Asset.objects.get(id=asset_id)
    asset.tags.clear()
    return Response()


@api_view(["GET"])
def get_new_version_no(request, asset_code):
    """
    gets the correct version number for an updated version of an asset.
    returns payload which has:
    - version_no
    """
    asset_version_no = (
        Asset.objects.values_list("version_no", flat=True) #by default values_list ret tuple, convert to return list
        .filter(code=asset_code)
        .order_by("-upload_datetime")
        .first()
    )  # return first or none
    return Response((asset_version_no or 0)+ 1)
