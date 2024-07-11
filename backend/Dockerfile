# Dockerfile

FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /backend/

# Add wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy the fixture file
COPY initial_data.json /backend/initial_data.json

# Run database migrations and load initial data
CMD ["sh", "-c", "./wait-for-it.sh db:5432 --timeout=30 --strict -- python manage.py migrate && python manage.py loaddata initial_data.json && python manage.py runserver 0.0.0.0:8000"]
