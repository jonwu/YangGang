#!/bin/sh
exec gunicorn -b :80 -w 4 --access-logfile - --error-logfile - app:app