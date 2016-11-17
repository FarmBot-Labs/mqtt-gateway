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

server.on("clientConnected", function (client) {
  console.log("clientConnected");
  console.dir(Object.keys(arguments[0] || {}))
});

server.on("clientDisconnecting", function (client) {
  console.log("clientDisconnecting");
  console.dir(Object.keys(arguments[0] || {}))
});

server.on("clientDisconnected", function (client) {
  console.log("clientDisconnected");
  console.dir(Object.keys(arguments[0] || {}))
});

server.on("published", function (client, packet) {
  console.log("<published>");
  console.log("    ", client.topic);
  console.log("    ", client.payload.toString().slice(0, 80));
  console.log("</published>");
});

server.on("subscribed", function (topic, client) {
  console.log("subscribed");
  console.dir(Object.keys(arguments[0] || {}))
});

server.on("unsubscribed", function (topic, client) {
  console.log("unsubscribed");
  console.dir(Object.keys(arguments[0] || {}))
});


server.on("ready", onReady(server));  //on init it fires up setup()

var authorizePublish = require("./security/authorize_publish");
var authorizeSubscribe = require("./security/authorize_subscribe");
server.authorizePublish = authorizePublish;
server.authorizeSubscribe = authorizeSubscribe;
