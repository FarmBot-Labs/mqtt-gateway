// test@test.com password123
import { fetchToken } from "./fetch_token";
import { verifyToken } from "./verify_token";
import { log } from "../logger";
import Axios, { Promise as AxiosPromise } from "axios";

type tokenHandler = (u: string, pass: string) => AxiosPromise<any>;
function determineAuthStrategy(username: string, password: string): tokenHandler {
    // Really long password? Probably a JWT.
    if (password.length > 100) {
        return verifyToken;
    } else {
        return fetchToken;
    }
};

export function authenticate(client, username: string, password: string, callback) {
    password = (password || "").toString();
    username = username || "";
    let auth = determineAuthStrategy(username, password);
    if (client && client.connection && client.connection.stream) {
        log(client.connection.stream.remoteAddress);
    }
    log("AUTH START")
    auth(password, username)
        .then(function (permissions) {
            log("AUTH OK " + username);
            client.permissions = permissions;
            callback(null, true);
        }, function (error) {
            log("AUTH FAIL " + username);
            log(error.message);
            log(error);
            client.authError = error;
            callback(null, false);
        });
}
