// test@test.com password123
import { verifyToken } from "../security/verify_token";
import { log } from "../logger";
import { authenticateOk } from "./authenticate_ok";
import { authenticateNo } from "./authenticate_no";

/** Determine if user is authorized to use the server. */
export function authenticate(client, username: string, password: string, callback) {
    log("AUTH START");
    let ok = authenticateOk(client, callback, username);
    let no = authenticateNo(client, callback, username);
    verifyToken(password.toString()).then(ok, no);
}
