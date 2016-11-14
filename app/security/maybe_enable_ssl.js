var SSL = proces.env.SSL_DOMAIN;
// ALL OF THESE HARDCODED VALUES ARE SET BY LETS ENCTRYPT/
// CERTBOT. <3 EFF
var SSL_DIR = `/etc/letsencrypt/live/${SSL}/`;
var SSL_MQTT_PORT = 8883;
var HTTPS_PORT = 443;
var SSL_CERT = SSL_DIR + "cert.pem";
var SSL_KEY = SSL_DIR + "privkey.pem";

module.exports = function maybeEnableSSL(config) {
    // if (SSL) {
    config.secure = config.secure || {};
    config.secure.port = SSL_MQTT_PORT;
    config.secure.keyPath = SSL_KEY;
    config.secure.certPath = SSL_CERT;

    config.https = config.https || {};
    config.https.port = HTTPS_PORT;
    // } else {
    //   console.log("================ SKIPPING SSL SETUP")
    // }
}
