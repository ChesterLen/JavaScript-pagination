from django.views import generic as views
from rest_framework import views as api_views
from rest_framework import serializers
from JavaScript_pagination.web import models
from rest_framework.response import Response
class IndexView(views.TemplateView):
    template_name = 'index.html'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'


class ListProductView(api_views.APIView):
    def get(self, req):
        books = models.Product.objects.all()
        serializer = ProductSerializer(books, many=True)
        return Response({"books": serializer.data})