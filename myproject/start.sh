#!/bin/bash
python manage.py migrate
python manage.py createsuperuser --noinput --username admin --email admin@admin.com || true
python manage.py runserver 0.0.0.0:8000