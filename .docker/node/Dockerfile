FROM node:15.14.0-alpine3.10
WORKDIR /usr/src/app
COPY ecommerce .
# RUN yarn
# RUN yarn global add nodemon sucrase express
COPY .docker/node/entrypoint.sh /usr/local/bin/

EXPOSE 3333

# Dockerize
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
