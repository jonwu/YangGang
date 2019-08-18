#!/bin/sh
cd src
exec gunicorn -b :80 -w 1 --access-logfile - --error-logfile - app:app