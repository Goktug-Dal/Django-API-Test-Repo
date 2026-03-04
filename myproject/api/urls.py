from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('view-rpg/', views.viewRPG),
    path('add-rpg/', views.addRPG),
]