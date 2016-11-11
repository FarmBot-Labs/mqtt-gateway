FROM ubuntu
MAINTAINER rick@farmbot.io

# Hardcoding this all for now while I work out the kinks.
ENV WEB_API_URL http://staging.farmbot.io 
ENV SSL_DOMAIN wow.rickcarlino.com
ENV SSL_EMAIL rick@farmbot.io
# DONT DELETE THIS
ENV NODE_ENV production
# Websocket based MQTT.
EXPOSE 3002

# Traditional TCP based MQTT.
EXPOSE 1883

ENV WEB_API_URL http://staging.farmbot.io 
RUN apt-get update
RUN apt-get install -y curl

# Install node:
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y letsencrypt

# Install our app:
COPY . /app
WORKDIR /app
RUN npm install

CMD ["npm", "start"]
# sudo docker run -d -p 3002:3002 -p 1883:1883 --restart=always mqtt