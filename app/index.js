var Server = require("mosca").Server;
var conf = require("./config");
var onReady = require("./on_ready");

var server = new Server({
  port: conf.mqttPort,
  http: { // for teh websockets
    port: conf.httpPort,
    bundle: true,
    static: "./frontend"
  }
});

server.on("ready", onReady(server));  //on init it fires up setup()
