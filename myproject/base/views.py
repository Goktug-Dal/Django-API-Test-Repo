from django.shortcuts import render
from .models import RPG

# Create your views here.

def main(request):
    #rpgs = RPG.objects.all()
    #context = {'rpgs': rpgs}
    #return render(request, 'main.html', context)
    return render(request, 'main.html')