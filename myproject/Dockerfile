FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev gcc

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#docker build -t combat-api .
#docker run -p 8000:8000 combat-api

#docker compose up -d
#docker-compose exec api python manage.py makemigrations
#docker-compose exec api python manage.py migrate