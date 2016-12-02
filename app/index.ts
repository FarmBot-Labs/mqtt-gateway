import { Server } from "mosca";
import { generateConfig } from "./config";
import { onReady } from "./on_ready";

let server = new Server(generateConfig(process.env.SSL_DOMAIN));

server.on("ready", onReady(server));
