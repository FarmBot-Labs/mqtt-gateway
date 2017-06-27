"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mosca_1 = require("mosca");
var config_1 = require("./config");
var on_ready_1 = require("./on_ready");
var server = new mosca_1.Server(config_1.generateConfig(process.env.SSL_DOMAIN));
server.on("ready", on_ready_1.onReady(server));
