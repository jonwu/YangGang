#!/bin/sh
alembic upgrade head
exec gunicorn -b :80 -w 4 --access-logfile - --error-logfile - --log-level=DEBUG app:app