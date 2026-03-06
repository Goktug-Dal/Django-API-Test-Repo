from django.db import models

# Create your models here.

class RPG(models.Model):
    name = models.CharField(max_length= 200)
    created = models.DateTimeField(auto_now_add=True)

    strength = models.IntegerField()
    health = models.IntegerField()
    attack_speed = models.IntegerField()
