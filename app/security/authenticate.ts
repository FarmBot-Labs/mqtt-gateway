// test@test.com password123
import { verifyToken } from "./verify_token";
import { log } from "../logger";

export function authenticate(client, username: string, password: string, callback) {
    if (client && client.connection && client.connection.stream) {
        log(client.connection.stream.remoteAddress);
    }
    log("AUTH START");
    verifyToken(password.toString())
        .then(function(permissions) {
            log("AUTH OK " + username);
            client.permissions = permissions;
            callback(null, true);
        }, function(error) {
            log("AUTH FAIL " + username);
            log(error.message);
            log(error);
            client.authError = error;
            callback(null, false);
        });
}
