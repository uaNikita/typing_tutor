from django.conf import settings
from django.core import signing
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from .models import Statistic
from .serializers import StatisticSerializer, UserSerializer
from rest_framework import permissions, generics, pagination

from django.views.generic.base import TemplateView


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


class IsNotAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_authenticated


class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = (IsNotAuthenticated,)
    serializer_class = UserSerializer

    ACCOUNT_ACTIVATION_DAYS = 7

    email_body_template = 'registration/activation_email_body.html'
    email_subject_template = 'registration/activation_email_subject.html'

    def get_activation_key(self, user):
        return signing.dumps(getattr(user, User.USERNAME_FIELD))

    def send_activation_email(self, user):
        ctx = {
            'activation_key': self.get_activation_key(user),
            'expiration_days': self.ACCOUNT_ACTIVATION_DAYS,
            'site': get_current_site(self.request),
            'user': user,
        }
        subject = render_to_string(self.email_subject_template)
        subject = ' '.join(subject.splitlines())
        message = render_to_string(self.email_body_template, ctx)

        user.email_user(subject, message, settings.DEFAULT_FROM_EMAIL)

    def create_inactive_user(self, serializer):
        user = serializer.save(is_active=False)
        self.send_activation_email(user)
        return user

    def perform_create(self, serializer):
        self.create_inactive_user(serializer)
