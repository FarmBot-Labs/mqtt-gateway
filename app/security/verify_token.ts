import { webAppUrl } from "../config";
import Axios from "axios";
import * as jwt from "jsonwebtoken";
import { log } from "../logger";

let url = webAppUrl + "/api/public_key";

function keyOk(resp) {
    log("Downloaded certificate from " + url);
    return new Buffer(resp.data, 'utf8');
}

function no(error) {
    log("Unable to download certificate from " + url);
    log("Is the FarmBot API running?");
    process.exit();
}

let getCertificate = Axios.get(url).then(keyOk, no);

export function verifyToken(token) {
    function no(error) {
        log("Unable to verify token " + url);
    }

    function ok(cert) {
        log("Did fetch certifiacte. Will verify token with certificate.");
        return jwt.verify(token, cert, { algorithms: ['RS256'] });
    }
    log("Will fetch certificate...")
    return getCertificate.then(ok, no)
};
