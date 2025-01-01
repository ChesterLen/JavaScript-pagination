from django.urls import path
from JavaScript_pagination.web import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('api_view/', views.ListProductView.as_view(), name='api_view'),
]