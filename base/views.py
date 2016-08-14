from django.views.generic.base import TemplateView
from datetime import date
from .models import Profile

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.core.context_processors import csrf

from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model

from .serializers import UserSerializer


class CreateUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

### next
class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        print(Profile.objects.all())

        return {
            'date': date.today(),
            'profiles': Profile.objects.all()
        }


class LoginView(TemplateView):
    template_name = "login.html"


class RegistrationView(TemplateView):
    template_name = "registration.html"


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('registration-complete')

    else:
        form = UserCreationForm()

    token = {}
    token.update(csrf(request))
    token['form'] = form

    return render_to_response('registration.html', token)


def registration_complete(request):
    return render_to_response('registration-complete.html')
