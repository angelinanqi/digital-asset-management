from .models import Asset, Tags, AssetTags
from rest_framework import serializers


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ["id", "title"]


class AssetTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetTags
        fields = ["asset", "tag"]
