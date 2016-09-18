# New Deploy

 0. Get a nice, fresh VM with Ubuntu 16
 0. [Install Docker](https://docs.docker.com/engine/installation/linux/ubuntulinux/)
 0. `sudo docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git`
 0. Run this:
```
  # => DANGER!!: CHANGE "staging.farmbot.io" TO YOUR API URL!!!!!!
  sudo docker run -d -e WEB_API_URL=YOUR_API_URL_HERE -p 3002:3002 -p 1883:1883 -p 80:3002 --restart=always mqtt
```

You now have a server running on port `3002` (Websockets) and `1883` (raw MQTT).
