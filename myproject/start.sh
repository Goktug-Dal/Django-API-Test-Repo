#!/bin/bash

# Apply database migrations
python manage.py migrate

# Start the Gunicorn server
# (Replace 'myproject' with the actual name of your core Django folder where wsgi.py lives)
gunicorn myproject.wsgi:application --bind 0.0.0.0:10000