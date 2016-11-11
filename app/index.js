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
    catchBadMessage(JSON.parse(x.payload.toString()), function(o) {
      console.log(`

      =============================
      NON-JSONRPC COMPLIANT MESSAGE
      =============================

      `);
      console.dir(o.value);
    });
  }
});

var authorizePublish = require("./security/authorize_publish");
var authorizeSubscribe = require("./security/authorize_subscribe");
server.authorizePublish = authorizePublish;
server.authorizeSubscribe = authorizeSubscribe;