from django.shortcuts import render
from .models import Asset, Tags
from .serializers import AssetSerializer, TagSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser

# Create your views here.
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    parser_classes = [MultiPartParser]

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagSerializer
    parser_classes = [MultiPartParser]