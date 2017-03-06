from django.conf.urls import include, url
from django.contrib import admin
from base.views import HomeView, StatisticViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'statistic', StatisticViewSet)

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^', HomeView.as_view(), name='home'),

    # url(r'^register/', CreateUserView.as_view(), name='user'),
]