FROM python:3.6-stretch

# for debugging
RUN apt-get update
RUN apt-get -y install vim
RUN apt-get -y install python3-dev
RUN apt-get -y install python3-dev
RUN apt-get -y install libevent-dev


# for gunicorn logging to console
ENV PYTHONUNBUFFERED=TRUE

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src src
WORKDIR /src

# expose 5000 port
EXPOSE 5000
ENTRYPOINT python app.py