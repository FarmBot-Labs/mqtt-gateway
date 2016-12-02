import "jest";
import { authenticate as auth } from "../../app/security/authenticate";
import axios from "axios";
var EMAIL = "admin@admin.com";
var PASSWORD = "password123";
var validJWT;

describe("authentication", function() {
    beforeAll(function(done) {
        axios
            .post("http://localhost:3000/api/tokens", {
                user: {
                    email: EMAIL,
                    password: PASSWORD
                }
            })
            .then(function(resp) {
                console.log("=========================");
                validJWT = resp.data.token.encoded;
                done();
            })
            .catch(function() {
                console.log("STAND UP AN API SERVER LOCALLY!");
            })
    })

    xit("logs in and attaches JSON web token to user", function(done) {
        var finished = false;
        var client: any = {};
        var callback = function(_, isAuthorized) {
            expect(isAuthorized).toBeTruthy();
            expect(client.permissions).toBeDefined();
            expect(client.permissions.sub).toBe(EMAIL);
            done();
        };
        auth(client, EMAIL, PASSWORD, callback);
    })

    it("logs in with a JWT as a password", function(done) {
        var finished = false;
        var client: any = {};
        var callback = function(_, isAuthorized) {
            expect(isAuthorized).toBeTruthy();
            expect(client.permissions).toBeDefined();
            expect(client.permissions.sub).toBe('admin@admin.com');
            done();
        };
        auth(client, EMAIL, validJWT, callback);
    });
});
