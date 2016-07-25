from django.views.generic.base import TemplateView
from datetime import date


class HomeView(TemplateView):
    template_name = "base/home.html"

    def get_context_data(self, **kwargs):
        return {
            'date': date.today()
        }
