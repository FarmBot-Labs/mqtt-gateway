# Dokku-less Usage

Change the part that says `SET_THIS_URL` to the URL of your Farmbot API (including `http://`).

```
docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git
docker run -d -e WEB_APP_URL=SET_THIS_URL -p 3002:3002 -p 1883:1883 -p 80:3002 mqtt
```

You now have a server running on port `3002` (Websockets) and `1883` (raw MQTT).

# Dokku 

Dokku doesn't work right now. This is how it will work when it does again.

dokku apps:create 00-default
dokku checks:disable 00-default
dokku proxy:disable 00-default
dokku config:set 00-default WEB_APP_URL=http://staging.farmbot.io
dokku docker-options:add 00-default run -p 3002:3002
dokku docker-options:add 00-default run -p 1883:1883
