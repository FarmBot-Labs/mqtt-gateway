import { Server } from "mosca";
import { log } from "./logger";

const EVENTS = [
    "clientConnected",
    "clientDisconnecting",
    "clientDisconnected",
    "published",
    "subscribed",
    "unsubscribed",
    "error"
];

export function startLogging(server: Server) {
    EVENTS.map(event => server.on(event, () => log(event)));
}
