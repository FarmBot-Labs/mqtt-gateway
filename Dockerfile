FROM ubuntu
MAINTAINER rick@farmbot.io

EXPOSE 1883
EXPOSE 8883
EXPOSE 80
EXPOSE 443
EXPOSE 3002

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