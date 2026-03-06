from rest_framework import serializers
from base.models import RPG

class RPGSerializer(serializers.ModelSerializer):
    class Meta:
        model = RPG
        fields = '__all__'