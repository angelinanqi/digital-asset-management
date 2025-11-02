from .models import Asset, Tags
from rest_framework import serializers

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ['id', 'title']