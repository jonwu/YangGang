# using an alpine container
FROM python:3.6-alpine

# for logging to the console
ENV PYTHONUNBUFFERED=TRUE

# for numpy to work

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY src src
WORKDIR /src

CMD python poller.py $BUILD_ENV

