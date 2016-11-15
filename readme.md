# PLEASE READ

You might not need to install this software. This software is used by the FarmBot team and advanced users who run their own FarmBot servers. We highly recommend that you use our publicly hosted server at [my.farmbot.io](http://my.farmbot.io), which elimintes the need for server setup.

# How It Works

Farmbot uses [MQTT](https://en.wikipedia.org/wiki/MQTT) for realtime events. On the device side, this is handled over a TCP connection to the MQTT broker. On the browser, this is performed over a Websocket connection.

## Our MQTT Implementation

 * Log in to the broker using the same email as on the web app. A JSON Web Token from the API can be used as a password.
 * Messages are sent using [JSON RPC](https://en.wikipedia.org/wiki/JSON-RPC).

## Available MQTT Topics

 * `bot/device_{ BOT_ID }/from_clients`: Commands originated from browsers and clients.
 * `bot/device_{ BOT_ID }/from_device`: This is where the bot publishes messages.

Subscribing to `bot/{ BOT_UUID }/*` via 3rd party MQTT client (Such as [MQTT FX](http://mqttfx.jfx4ee.org/index.php/download)) is useful for debugging and monitoring.

# Installation

1. git clone THIS_REPO
2. cd THIS_REPO
3. npm install
4. Setup and run the [Web API](https://github.com/FarmBot/Farmbot-Web-API) locally. We recommend running it on `http://localhost:3000`
5. `WEB_API_URL=http://localhost:3000 node app/index.js`. See note below*.
6. Websocket MQTT is now available via `ws://localhost:3002` and `wss://localhost:443`.  Raw MQTT (TCP connections) are available via `mqtt://localhost:1883`. 

\* The assumption is that you are running a [Web API](https://github.com/FarmBot/Farmbot-Web-API) instance on `localhost:3000`. If you are using a different API server, please change `WEB_API_URL` accordingly.

# ENV var reference

The MQTT broker uses ENV vars as the main means of configuration. These must be set properly for the app to work.

 * `MQTT_WEBSOCKET_PORT`: **Optional.** WebSocket connection port. We recommend using 3002. **NOTE** If you are using standard MQTT, that is *always* port 1883. Raise an issue if you need to run MQTT on a different port.
 * `WEB_API_URL`: URL to your [FarmBot API](https://github.com/FarmBot/Farmbot-Web-API). For instance, if you were running the API locally, you would set this value to `localhost:3000`.
 * `SSL_DOMAIN`: **Optional.**. Do not set if you do not plan on using [Let's Encrypt](https://letsencrypt.org/). This is the domain that Let's Encrypt will verify ownership of.
 * `SSL_EMAIL`: **Optional.**. Email for correspondence related to [Let's Encrypt](https://letsencrypt.org/).

# Running on Local (for development)

 * Start the [FarmBot API](https://github.com/FarmBot/Farmbot-Web-API) on your local machine on default port.
 * Run `npm run dev`

# Running the Test Suite

`npm test`

# Provisioning a Production Server

See `DEPLOYMENT.md`.

# Want to Help?

[Low Hanging Fruit](https://github.com/FarmBot/mqtt-gateway/search?q=TODO&utf8=%E2%9C%93)