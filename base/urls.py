from django.conf.urls import url, include
from .views import HomeView, CreateUserView

urlpatterns = [
    url(r'^', HomeView.as_view(), name='home'),
    url(r'^create-user', CreateUserView.as_view()),
]
