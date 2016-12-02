import { Server } from "mosca";
import { conf } from "./config";
import { onReady } from "./on_ready";
import { maybeEnableSSL } from "./security/maybe_enable_ssl";
import { authorizePublish } from "./security/authorize_publish";
import { authorizeSubscribe } from "./security/authorize_subscribe";

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
server.authorizePublish = authorizePublish;
server.authorizeSubscribe = authorizeSubscribe;
