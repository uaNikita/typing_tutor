from django.conf.urls import url, patterns
from .views import HomeView

urlpatterns = patterns('', [
    url(r'^home$', HomeView.as_view(), name='home'),
])
