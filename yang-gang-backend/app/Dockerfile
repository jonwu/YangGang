FROM python:3.6-stretch

# for gunicorn logging to console
ENV PYTHONUNBUFFERED=TRUE

COPY src src
WORKDIR /src

RUN pip install -r requirements.txt

COPY boot.sh ./
RUN chmod +x boot.sh

# expose 80 port
EXPOSE 80
ENTRYPOINT ["./boot.sh"]

