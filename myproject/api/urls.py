from django.urls import path
from . import views

urlpatterns = [
    path('', views.viewRPG),
    path('get/<int:id>/', views.get),
    path('add-rpg/', views.addRPG),
    path('fight/<int:id1>/<int:id2>/', views.fight),
    path('leader/', views.leader),
    path('fix/<int:id>/', views.fix),
    path('delete/<int:id>/', views.delete),
]