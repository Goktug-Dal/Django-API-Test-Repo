FROM python:3.13-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y pkg-config default-libmysqlclient-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#docker build -t combat-api .
#docker run -p 8000:8000 combat-api