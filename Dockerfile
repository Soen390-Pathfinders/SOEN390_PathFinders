FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the whole project (including backend) into the container
COPY . /app/

# Change to the backend directory before running the Django server
WORKDIR /app/backend

# Expose port 8000 for the Django app
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

