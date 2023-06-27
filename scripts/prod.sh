python manage.py collectstatic --no-input # Collects the static files
python manage.py migrate # Runs the migrations based on the migration files
gunicorn -w 4 -b 0.0.0.0:8000 project.wsgi:application # starts the gunicorn server on port 8000