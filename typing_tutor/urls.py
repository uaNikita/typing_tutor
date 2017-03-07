from django.conf.urls import include, url
from django.contrib import admin
from base.views import HomeView, CreateUserView, StatisticList

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^register/', CreateUserView.as_view(), name='user'),
    url(r'^statistic/', StatisticList.as_view(), name='statistic'),
    url(r'^', HomeView.as_view(), name='home'),
]
