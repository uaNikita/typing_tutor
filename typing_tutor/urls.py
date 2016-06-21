from django.conf.urls import url, include
from rest_framework import routers
from test_app import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# from django.conf.urls import include, url
# from django.contrib import admin
#
# urlpatterns = [
#     url(r'^$', include('test_app.urls')),
#     url(r'^admin/', admin.site.urls),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]
