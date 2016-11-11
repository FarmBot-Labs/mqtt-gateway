FROM ubuntu
MAINTAINER rick@farmbot.io

# Websocket based MQTT.
EXPOSE 3002

# Traditional TCP based MQTT.
EXPOSE 1883

ENV WEB_API_URL http://staging.farmbot.io 
RUN apt-get update

# Install node 7:
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

# Install our app:
COPY . /app
WORKDIR /app
RUN npm install

# TODO: INSTALL CERTBOT HERE!

CMD ["npm", "start"]
# sudo docker run -d -p 3002:3002 -p 1883:1883 --restart=always mqtt