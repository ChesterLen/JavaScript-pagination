from django.urls import path
from JavaScript_pagination.web import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
]