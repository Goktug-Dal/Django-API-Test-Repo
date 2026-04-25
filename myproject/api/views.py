from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

from base.models import RPG
from .serializers import RPGSerializer

from django.shortcuts import redirect, render

@api_view(['GET'])
@permission_classes([AllowAny])
def get(request, id):
    rpg = RPG.objects.get(id=id)
    serializer = RPGSerializer(rpg)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def viewRPG(request):
    rpgs = RPG.objects.all()
    serializer = RPGSerializer(rpgs, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def addRPG(request):
    serializer = RPGSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET','POST']) # post for permanent effect
@permission_classes([AllowAny])
def fight(request, id1, id2):
    ch1 = RPG.objects.get(id = id1)
    ch2 = RPG.objects.get(id = id2)

    ch1_str = ch1.strength
    ch2_str = ch2.strength
    log = []
    round_count = 1
    while ch2.health > 0 and ch1.health > 0:
        log.append(f"Tour "+ str(round_count) + " Results: ")
        ch2.health -= ch1_str
        if ch2.health <= 0:
            ch2.health = 0

        log.append("Charachter 1's dealt "+ str(ch1_str)+ " Damage:" )
        if(ch2.health != 0):
            ch1.health -= ch2_str
            log.append("Charachter 2's dealt "+ str(ch2_str) + " Damage:" )
            if(ch1.health <= 0):
                ch1.health = 0
        
        

        log.append("Charachter 1's current health " + str(ch1.health) + " Damage:" )
        log.append("Charachter 2's current health " + str(ch2.health) + " Damage:" )

        if ch1.health <= 0:
            log.append("CH1 LOST! ")
        elif ch2.health <= 0:
            log.append("CH2 LOST")
        round_count += 1
    ch1.save() #have to save so its actually permananet
    ch2.save()

    rpgs = [ch1,ch2] 
    serializer = RPGSerializer(rpgs, many= True)
    # we serialize it here to get the updated data

    return Response({"info":serializer.data, "log":log})

@api_view(['GET'])
@permission_classes([AllowAny])
def leader(request):
    chas = RPG.objects.order_by('-health')
    serializer = RPGSerializer(chas, many= True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def fix(request, id):
    cha = RPG.objects.get(id = id)
    cha.health += 100
    cha.save()
    serializer = RPGSerializer(cha, many= False)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def delete(request, id):
    cha = RPG.objects.get(id = id)
    serializer = RPGSerializer(cha, many= False)
    cha.delete()
    return Response(serializer.data)

