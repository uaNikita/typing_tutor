from django.conf.urls import url
from .views import HomeView, LoginView, RegistrationView

urlpatterns = [
    url(r'$', HomeView.as_view(), name='home'),
    url(r'login$', LoginView.as_view(), name='home'),
    url(r'registration$', RegistrationView.as_view(), name='home'),
]
