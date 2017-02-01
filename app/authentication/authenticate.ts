// test@test.com password123
import { verifyToken } from "../security/verify_token";
import { log } from "../logger";
import { authenticateOk } from "./authenticate_ok";
import { authenticateNo } from "./authenticate_no";
type MaybeString = string | undefined;

/** Determine if user is authorized to use the server. */
export function authenticate(client, username: MaybeString, password: MaybeString, callback) {
    log("AUTH START");
    let ok = authenticateOk(client, callback, username);
    let no = authenticateNo(client, callback, username);
    if (username && password) {
        verifyToken(password.toString()).then(ok, no);
    } else {
        no(new Error("username and password required"));
    }
}
