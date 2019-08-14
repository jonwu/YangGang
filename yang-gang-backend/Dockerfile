# using an alpine container with miniconda pre-installed
FROM frolvlad/alpine-miniconda3

# good practice not to use root user
RUN adduser -D yang
ENV ENVNAME=yanggang

# for gunicorn logging to console
ENV PYTHONUNBUFFERED=TRUE

# set working directory - all future commands will be executed in /home/yang
WORKDIR /home/yang

# TODO: non-optimal, shouldn't need to install bash to create a conda env
RUN apk update
RUN apk upgrade
RUN apk add bash

# TODO: alpine doesn't support yum for nginx install ... take care of this later.
#RUN yum -y update && yum clean all && \
#	yum install -y nginx

# TODO: might want to switch to virtualenv to golf on space
# copy environment.yml and install dependencies
COPY environment.yml environment.yml
RUN conda env create -f environment.yml python=3.6

COPY boot.sh ./
RUN chmod +x boot.sh

#copy code into image
COPY app app

# give yang user permissions
RUN chown -R yang:yang ./
USER yang

# expose 5000 port
EXPOSE 5000
ENTRYPOINT ["./boot.sh"]

