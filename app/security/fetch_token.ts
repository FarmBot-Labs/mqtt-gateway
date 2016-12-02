import Axios from "axios";
import { webAppUrl } from "../config";
import { log } from "../logger";
import * as config from "../config";

const TOKEN_URL = "" + config.webAppUrl + '/api/tokens';

export function fetchToken(password, username) {
    let params = {
        user: {
            email: username,
            password: password
        }
    };
    let email = params.user.email;
    let e = new Error(
        "Login credentials are too short. Use a JSON web token as password");
    return Promise.reject(e);
}
