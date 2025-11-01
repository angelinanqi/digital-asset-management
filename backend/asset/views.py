from django.shortcuts import render
from .models import Asset
from .serializers import AssetSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser

# Create your views here.
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    parser_classes = [MultiPartParser]