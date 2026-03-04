from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, RPG
from .serializers import ItemSerializer, RPGSerializer

from django.shortcuts import redirect, render

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
    #person = {'name': 'Dennis', 'age': '28'}
    #return Response(person)

@api_view(['POST'])
def addItem(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def viewRPG(request):
    rpgs = RPG.objects.all()
    serializer = RPGSerializer(rpgs, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def addRPG(request):
    serializer = RPGSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET','POST']) # post for permanent effect
def fight(request, id1, id2):
    ch1 = RPG.objects.get(id = id1)
    ch2 = RPG.objects.get(id = id2)

    ch1_str = ch1.strength
    ch2_str = ch2.strength

    while ch2.health > 0 and ch1.health > 0:
        ch2.health -= ch1_str
        if ch2.health <= 0:
            ch2.health = 0

        if(ch2.health != 0):
            ch1.health -= ch2_str
            if(ch1.health <= 0):
                ch1.health = 0

    ch1.save() #have to save so its actually permananet
    ch2.save()

    rpgs = [ch1,ch2] 
    serializer = RPGSerializer(rpgs, many= True)
    # we serialize it here to get the updated data

    return Response(serializer.data)

