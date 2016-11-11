FROM ubuntu
MAINTAINER rick@farmbot.io

# Hardcoding this all for now while I work out the kinks.
ENV WEB_API_URL http://staging.farmbot.io 
ENV SSL_DOMAIN mqtt-staging.farmbot.io
ENV SSL_EMAIL rick@farmbot.io

# DONT DELETE THIS
ENV NODE_ENV production

EXPOSE 3002
EXPOSE 1883
COPY . /app
WORKDIR /app
RUN chmod +x deploy.sh
RUN chmod +x post_deploy.sh
RUN ./deploy.sh

CMD ["npm", "start"]
# sudo docker run -d -p 3002:3002 -p 1883:1883 --restart=always mqtt