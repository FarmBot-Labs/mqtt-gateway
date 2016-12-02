import { authenticate } from "./security/authenticate";
import { authorizePublish } from "./security/authorize_publish";
import { authorizeSubscribe } from "./security/authorize_subscribe";
import { log } from "./logger";
import { startLogging } from "./start_logging";

export let onReady = (server) => () => {
    log("Server online");
    startLogging(server);
    startSecurity(server);
};

function startSecurity(server) {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
}
