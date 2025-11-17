from django.contrib.auth.models import Group
from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "url",
            "username",
            "first_name",
            "last_name",
            "password1",
            "password2",
            "email",
            "groups",
            "is_active",
            "date_joined",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "groups": {"read_only": True},
            "is_active": {"read_only": True},
            "date_joined": {"read_only": True},
        }

    def validate(self, value):
        if value["password1"] != value["password2"]:
            raise serializers.ValidationError("Passwords do not match.")
        else:
            try:
                validate_password(value["password1"])  # runs all validators in settings
            except ValidationError as e:
                raise serializers.ValidationError(list(e.messages))
            return value

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")
        groups_data = validated_data.pop("groups", None)
        if not groups_data:
            try:
                default_group = Group.objects.get(id=2)
                groups_data = [default_group.id]
            except Group.DoesNotExist:
                groups_data = []  # safe fallback
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.groups.set(groups_data)
        return user


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]

class NewTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        group_name = None
        if self.user.groups.exists():
            group_name = self.user.groups.first().name

        # add whatever you want to return
        # data['username'] = self.user.username
        data['id'] = self.user.id
        data["group"] = group_name

        return data