from django.shortcuts import render
from .models import Asset, Tags
from .serializers import AssetSerializer, TagSerializer
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from .serializers import AssetSerializer 


# Create your views here.
class AssetViewSet(viewsets.ModelViewSet):

    # queryset initially returns all the asset objects
    queryset = Asset.objects.all() 
    serializer_class = AssetSerializer
    parser_classes = [MultiPartParser]

    filter_backends = [filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend]

    # ordering assets based on specified fields
    ordering_fields = ['name', 'upload_datetime']

    # filter based on specified fields 
    filterset_fields = ['tags']

    # filter based on search keywords
    search_fields = ['name', 'description', 'file_type']

    # return asset based on latest version_no
    def get_queryset(self):
        return Asset.objects.order_by('code', '-version_no').distinct('code')
    

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer

    """
    bryan edit: added sorting based on title (asc order) 

    """
    filter_backends = [filters.OrderingFilter]

    ordering_fields = ['title']


@api_view(['GET'])
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
    example: if asset currently has only 1 version, this method will return 2
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

@api_view(["GET"])
def get_all_file_versions(request, asset_code):
    """
    gets all asset records under the same asset code.
    """
    file_versions = Asset.objects.filter(code=asset_code).order_by("-version_no")
    serializer = AssetSerializer(file_versions, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
def delete_asset_by_code(request, asset_code):
    """
    delete assets by asset code (for version control)
    """
    assets_to_delete = Asset.objects.filter(code=asset_code)

    count = assets_to_delete.count()

    assets_to_delete.delete()

    return Response({"detail": f"Deleted {count} asset(s) with code {asset_code}."})
