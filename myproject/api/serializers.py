from rest_framework import serializers
from base.models import Item
from base.models import RPG

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class RPGSerializer(serializers.ModelSerializer):
    class Meta:
        model = RPG
        fields = '__all__'