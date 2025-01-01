from django.db import models

class Product(models.Model):
    rank = models.IntegerField()
    name = models.CharField(max_length=255)
    year = models.IntegerField()
    marks = models.IntegerField()
    percentage = models.IntegerField()