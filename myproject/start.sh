#!/bin/bash

python manage.py migrate

exec gunicorn myproject.wsgi:application --bind 0.0.0.0:$PORT