from django.conf.urls import url, include
from .views import HomeView, LoginView, RegistrationView, CreateUserView, register, registration_complete

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^login$', LoginView.as_view(), name='login'),
    url(r'^create-user', CreateUserView.as_view(), name='create-user'),
    # url(r'registration$', RegistrationView.as_view(), name='registration'),
    url(r'^registration$', register, name='register'),
    url(r'^registration-complete$', registration_complete, name='registration_complete'),
]
