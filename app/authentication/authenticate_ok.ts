import { log } from "../logger";
/** Creates a function that is triggered when a JWT is invalid. */
export function authenticateOk(client, callback, username) {
    return function (permissions) {
        log("AUTH OK " + username);
        client.permissions = permissions;
        callback(null, true);
    };
}
