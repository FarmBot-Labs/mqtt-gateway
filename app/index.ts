let Server = require("mosca").Server;
let conf = require("./config");
let onReady = require("./on_ready");
let maybeEnableSSL = require("./security/maybe_enable_ssl");

let input = {
    allowNonSecure: true,
    port: conf.mqttPort,
    http: { // for teh websockets
        port: conf.httpPort,
        bundle: true,
        static: "./public"
    }
};

maybeEnableSSL(input)
let server = new Server(input);

server.on("ready", onReady(server));  //on init it fires up setup()
server.on("ready", function() {
    console.dir(input);
});
let authorizePublish = require("./security/authorize_publish");
let authorizeSubscribe = require("./security/authorize_subscribe");
server.authorizePublish = authorizePublish;
server.authorizeSubscribe = authorizeSubscribe;
