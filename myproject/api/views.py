from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, RPG
from .serializers import ItemSerializer, RPGSerializer

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
