# PLEASE READ

You might not need to install this software. This software is used by the FarmBot team and advanced users who run their own FarmBot servers. We highly recommend that you use our publicly hosted server at [my.farmbot.io](http://my.farmbot.io), which elimintes the need for server setup.

# How It Works

Farmbot uses [MQTT](https://en.wikipedia.org/wiki/MQTT) for realtime events. On the device side, this is handled over a TCP connection to the MQTT broker. On the browser, this is performed over a Websocket connection.

## Our MQTT Implementation

 * Log in to the broker using the same email as on the web app. A JSON Web Token from the API can be used as a password.
 * Messages are sent using [JSON RPC](https://en.wikipedia.org/wiki/JSON-RPC).

## Available MQTT Topics

 * `bot/{ BOT_UUID }/request`: User initiated command objects are sent here. 
 * `bot/{ BOT_UUID }/response`: Successfully completed commands are reported on this channel.
 * `bot/{ BOT_UUID }/notification`: Messages that were not initiated by the user are sent here. Eg: logs and statuses.
 * `bot/{ BOT_UUID }/error`: Failed commands are reported to this channel.

Subscribing to `bot/{ BOT_UUID }/*` via 3rd party MQTT client (Such as [MQTT FX](http://mqttfx.jfx4ee.org/index.php/download)) is useful for debugging and monitoring.

# Installation

1. git clone THIS_REPO
2. cd THIS_REPO
3. npm install
4. node index.js
5. Visit `http://localhost:3000` or `mqtt://localhost:1883`

# ENV var reference

The MQTT broker uses ENV vars as the main means of configuration. These must be set properly for the app to work.

* `PORT`: WebSocket connection port. We recommend using 3002. **NOTE** If you are using standard MQTT, that is *always* port 1883. Raise an issue if you need to run MQTT on a different port.
* `WEB_APP_URL`: URL to your [FarmBot API](https://github.com/FarmBot/Farmbot-Web-API). For instance, if you were running the API locally, you would set this value to `localhost:3000`

# Running on Local (for development)

 * Start the [FarmBot API](https://github.com/FarmBot/Farmbot-Web-API) on your local machine on default port.
 * Run `npm run dev`

# Provisioning a Production Server

0. Create a clean Ubuntu server on your VPS vendor of choice. We recommend Digital Ocean.
0. [Install Dokku](https://github.com/dokku/dokku#installing) on the server. Do NOT use Digital Ocean's one click "Dokku" image- it is outdated for this use case. 
0. Install dokku-haproxy plugin: `ssh root@YOUR_SERVER dokku plugin:install https://github.com/256dpi/dokku-haproxy.git`
0. Deploy: `git push dokku@YOUR_SERVER:mqtt` where `mqtt` is the name of your app in Dokku.
0. Point to correct host/port: `ssh dokku@MQTT_SERVER config:set mqtt PORT=3002 WEB_APP_URL=http://WEBAPP_URL_HERE`
0. Expose MQTT port: `ssh dokku@MQTT_SERVER ports:add mqtt 1883 web 1883`
0. Expose WebSocket port: `ssh dokku@MQTT_SERVER ports:add mqtt 3002 web 3002`
