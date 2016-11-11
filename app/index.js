var Server = require("mosca").Server;
var conf = require("./config");
var onReady = require("./on_ready");
var catchBadMessage = require("./jsonrpc_sanitizer").tagMessage;
var maybeEnableSSL = require("./security/maybe_enable_ssl");

var input = {
  port: conf.mqttPort,
  http: { // for teh websockets
    port: conf.httpPort,
    bundle: true,
    static: "./public"
  }
};
maybeEnableSSL(input)
var server = new Server(input);


server.on("ready", onReady(server));  //on init it fires up setup()
server.on("published", function(x) {
  if(x && x.topic && (x.topic.slice(0,3) === "bot")) {
    function is_valid_json(str) {
      try {
        JSON.parse(str)
      } catch(e){
        return false;
      }
      return true;
    }
    pl_str = x.payload.toString();
    if(is_valid_json(pl_str)){
      catchBadMessage(JSON.parse(pl_str), function(o) {
      console.log(`

      =============================
      NON-JSONRPC COMPLIANT MESSAGE
      =============================

      `);
      console.dir(o.value);
    });
    } else {
      console.log(`
      =============================
      NON-JSONRPC COMPLIANT MESSAGE
      =============================
      `);
    }
  }
});

var authorizePublish = require("./security/authorize_publish");
var authorizeSubscribe = require("./security/authorize_subscribe");
server.authorizePublish = authorizePublish;
server.authorizeSubscribe = authorizeSubscribe;

var env = process.env.NODE_ENV;
var email = process.env.SSL_EMAIL;
var domain = process.env.SSL_DOMAIN;

if(env === "production" && email && domain) {
  require('child_process')
    .execSync(`letsencrypt certonly --webroot \
                      -w /app/public \
                      -d $SSL_DOMAIN \
                      --text \
                      --non-interactive \
                      --agree-tos \
                      --email $SSL_EMAIL`);
} else {
  console.log(`
      ==========================================================================
      WARNING: No SSL certificate infomation found in ___ and ___.
      This will not prevent the MQTT server from running, but all messages will
      be sent unecrypted.
      ==========================================================================
      `);

}
