import { log } from "../logger";
/** Creates a function that is triggered when a JWT is invalid. */
export function authenticateNo(client, callback, username) {
    return function (error) {
        log("AUTH FAIL " + username);
        log(error.message);
        log(error);
        client.authError = error;
        callback(null, false);
    };
}
