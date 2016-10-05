# How to Deploy

 0. Get a nice, fresh VM with Ubuntu 16. We recomend the one that comes pre-installed Docker on Digital Ocean.
 0. [Install Docker if you didn't use Digital Ocean's docker image.](https://docs.docker.com/engine/installation/linux/ubuntulinux/). Digital ocean offers an Ubuntu image that comes pre-installed with Docker.
 0. `sudo docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git`
 0. Run this:
```
  # => DANGER!!: CHANGE "YOUR_API_URL_HERE" TO YOUR API URL!!!!!!
  # => Server will crash if you forget the http:// part.
  sudo docker run -d -e WEB_API_URL=http://YOUR_API_URL_HERE -p 3002:3002 -p 1883:1883 -p 80:3002 --restart=always mqtt
```

You now have a server running on port `3002` (Websockets) and `1883` (raw MQTT).