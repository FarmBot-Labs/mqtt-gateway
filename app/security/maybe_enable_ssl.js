var SSL = process.env.SSL_DOMAIN;
// ALL OF THESE HARDCODED VALUES ARE SET BY LETS ENCTRYPT/
// CERTBOT. <3 EFF
var SSL_DIR = `/etc/letsencrypt/live/${SSL}/`;
var SSL_MQTT_PORT = 8883;
var HTTPS_PORT = 443;
var SSL_CERT = SSL_DIR + "cert.pem";
var SSL_KEY = SSL_DIR + "privkey.pem";
var log = require("../logger");

module.exports = function maybeEnableSSL(config) {
    if (SSL) {
        config.secure = config.secure || {};
        config.secure.port = SSL_MQTT_PORT;
        config.secure.keyPath = SSL_KEY;
        config.secure.certPath = SSL_CERT;

        config.https = config.https || {};
        config.https.port = HTTPS_PORT;
    } else {
        log(`
        Running MQTT server in non-secure mode.
        If you require HTTPS:// or SSL, please run Let's Encrypt Webroot plugin.
        If you are running on a local network or are just doing development
        work, you can ignore this message.
        `);
    }
}
