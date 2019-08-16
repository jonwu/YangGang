#!/bin/sh
cd src
exec gunicorn -b :5000 -w 1 --access-logfile - --error-logfile - app:app