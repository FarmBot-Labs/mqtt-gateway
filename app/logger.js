"use strict";
function log(args) {
    if (!process.env.DISABLE_LOGS) {
        console.log.apply(this, arguments);
    }
}
exports.log = log;
