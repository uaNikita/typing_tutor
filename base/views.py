from django.views.generic.base import TemplateView
from datetime import date
from .models import Profile


class HomeView(TemplateView):
    template_name = "base/home.html"

    def get_context_data(self, **kwargs):
        print(Profile.objects.all())

        return {
            'date': date.today(),
            'profiles': Profile.objects.all()
        }


class LoginView(TemplateView):
    template_name = "base/login.html"


class RegistrationView(TemplateView):
    template_name = "base/registration.html"
