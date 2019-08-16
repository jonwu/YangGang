# using an alpine container
FROM python:3.6-alpine

# for logging to the console
ENV PYTHONUNBUFFERED=TRUE

COPY src src
WORKDIR /src

RUN pip install -r requirements.txt

CMD python poller.py

