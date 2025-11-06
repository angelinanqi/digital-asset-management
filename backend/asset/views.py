from django.shortcuts import render
from .models import Asset, Tags, AssetTags
from .serializers import AssetSerializer, TagSerializer, AssetTagSerializer
from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser

# Create your views here.
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    parser_classes = [MultiPartParser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'file_type']

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer

class AssetTagViewSet(viewsets.ModelViewSet):
    queryset = AssetTags.objects.all()
    serializer_class = AssetTagSerializer