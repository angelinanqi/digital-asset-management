from django.contrib.auth.models import Group
from .models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password1 = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password2 = serializers.CharField(write_only=True, required=False, allow_blank=True)

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
            "current_password",
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

    def validate(self, attrs):
        pw1 = attrs.get("password1")
        pw2 = attrs.get("password2")
        current_pw = attrs.get("current_password")

        # --- SIGN UP FLOW (instance == None) ---
        if self.instance is None:
            if not pw1 or not pw2:
                raise serializers.ValidationError({"password": "Password is required."})

            if pw1 != pw2:
                raise serializers.ValidationError({"password": "Passwords do not match."})

            try:
                validate_password(pw1)
            except ValidationError as e:
                raise serializers.ValidationError({"password": list(e.messages)})

            return attrs

        # --- UPDATE FLOW (instance exists) ---
        if pw1 or pw2:
            if not current_pw:
                raise serializers.ValidationError({"current_password": "Current password is required."})

            if not self.instance.check_password(current_pw):
                raise serializers.ValidationError({"current_password": "Current password is incorrect."})

            if pw1 != pw2:
                raise serializers.ValidationError({"password": "New passwords do not match."})

            try:
                validate_password(pw1)
            except ValidationError as e:
                raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def update(self, instance, validated_data):
        # Update personal info
        for attr in ["first_name", "last_name", "email"]:
            if attr in validated_data:
                setattr(instance, attr, validated_data[attr])

        # Update password if provided
        pw1 = validated_data.get("password1")
        if pw1:
            instance.set_password(pw1)

        instance.save()
        return instance

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")
        # Public signup always gets Viewer, regardless of database-generated IDs.
        validated_data.pop("groups", None)
        default_group, _ = Group.objects.get_or_create(name="Viewer")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.groups.set([default_group])
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
        data['username'] = self.user.username
        data['id'] = self.user.id
        data["group"] = group_name

        return data
