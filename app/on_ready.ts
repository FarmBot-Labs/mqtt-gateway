import { authenticate } from "./authentication/authenticate";
import { authorizePublish } from "./authorization/authorize_publish";
import { authorizeSubscribe } from "./authorization/authorize_subscribe";
import { log } from "./logger";

export let onReady = (server) => () => {
    log("Server online");
    server.on("clientConnected", () => log("clientConnected"));
    server.on("clientDisconnecting", () => log("clientDisconnecting"));
    server.on("clientDisconnected", () => log("clientDisconnected"));
    server.on("published", () => log("published"));
    server.on("subscribed", () => log("subscribed"));
    server.on("unsubscribed", () => log("unsubscribed"));
    server.on("error", () => log("error"));
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
};
