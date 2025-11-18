from django.shortcuts import render
from django.contrib.auth.models import Group
from .models import User
from .serializers import UserSerializer, GroupSerializer
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import NewTokenObtainPairSerializer

# Create your views here.

class IsAdminOrSelf(permissions.BasePermission):
    """
    Allow access if user is admin, or if user is requesting their own object.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return obj == request.user
    
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAdminOrSelf()]
    
    # check here anqi
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  # allow partial PATCH
        return super().update(request, *args, **kwargs)

    
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class NewTokenObtainPairView(TokenObtainPairView):
    serializer_class = NewTokenObtainPairSerializer