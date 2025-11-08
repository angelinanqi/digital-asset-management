from .models import Asset, Tags
from rest_framework import serializers


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ["id", "title"]

class UsageCountSerializer(serializers.ModelSerializer):
    usage_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Tags
        fields = ["id", "title", "usage_count"]

class VersionNumberSerializer(serializers.ModelSerializer):
    asset_version_no = serializers.IntegerField(read_only=True)
    class Meta:
        model = Asset
        fields = "__all__"


        
