FROM python:3.6-stretch

# for debugging
RUN apt-get update
RUN apt-get -y install vim

# for gunicorn logging to console
ENV PYTHONUNBUFFERED=TRUE

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src src
WORKDIR /src

RUN chmod +x boot.sh

# expose 80 port
EXPOSE 80
ENTRYPOINT ["./boot.sh"]

