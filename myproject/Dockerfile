FROM python:3.13-slim

WORKDIR /app

# 1. Install system dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev gcc

# 2. Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# 3. COPY THE REST OF YOUR CODE FIRST
COPY . .

# 4. NOW run collectstatic (because manage.py and your settings are finally inside the container)
RUN python manage.py collectstatic --noinput

# 5. Start the server
CMD ["bash", "start.sh"]
#docker build -t combat-api .
#docker run -p 8000:8000 combat-api

#docker compose up -d
#docker-compose exec api python manage.py makemigrations
#docker-compose exec api python manage.py migrate