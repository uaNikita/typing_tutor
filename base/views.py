from django.views.generic.base import TemplateView

from rest_framework import permissions, viewsets, generics, pagination

from .models import Statistic
from .serializers import StatisticSerializer, UserSerializer
from django.contrib.auth.models import User


class HomeView(TemplateView):
    template_name = "base.html"


class NotPaginatedSetPagination(pagination.PageNumberPagination):
    page_size = None

class StatisticList(generics.ListCreateAPIView):
    model = Statistic
    serializer_class = StatisticSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = NotPaginatedSetPagination

    def get_queryset(self):
        queryset = self.model.objects.all().filter(user=self.request.user)
        return queryset


class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
