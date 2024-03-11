#!/bin/bash

cd backend

echo "Installing backend dependencies"
pip install -r requirements.txt

echo "Running backend migrations"
python manage.py makemigrations

echo "Migrating database"
python manage.py migrate
