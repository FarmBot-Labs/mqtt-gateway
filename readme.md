# Not In Use

This is a prototype that is not currently used.

# How It Will Work (When Finished)

1. Connect to `my.farmbot.io` with any MQTT client
2. Use your myfarmbot username / pass as MQTT credentials.
3. RPC all the things.

# Installation

1. git clone THIS_REPO
2. cd THIS_REPO
3. npm install
4. node index.js
5. Visit `http://localhost:3000` or `mqtt://localhost:1883`

# Provisioning the Server

0. Create a fresh Ubuntu 14 server with Dokku (or just use DigitalOcean)
0. Install dokku-haproxy plugin: `ssh root@YOUR_SERVER dokku plugin:install https://github.com/256dpi/dokku-haproxy.git`
0. Deploy: `git push dokku@YOUR_SERVER:00-default`
0. Point to correct host/port: `ssh dokku@MQTT_SERVER config:set 00-default PORT=3002 DOKKU_NGINX_PORT=3002 WEB_APP_URL=WEBAPP_URL_HERE
0. Expose MQTT port: `ssh dokku@mqtt.datamelon.io ports:add 00-default 1883 web 1883

# TODO

1. Tie into `authorizePublish` and `authorizeSubscribe`..
2. Deploy to prod.
