var auth = require("../../app/security/authenticate");
var axios = require("axios");
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
    it("logs in and attaches JSON web token to user", function(done) {
        var finished = false;
        var client = {};
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
        var client = {};
        var callback = function(_, isAuthorized) {
            expect(isAuthorized).toBeTruthy();
            expect(client.permissions).toBeDefined();
            expect(client.permissions.sub).toBe('admin@admin.com');
            done();
        };
        auth(client, EMAIL, validJWT, callback);
    })

    it("logs in with a username/password", function(done) {
        var finished = false;
        var client = {};
        var callback = function(_, isAuthorized) {
            expect(isAuthorized).toBeTruthy();
            expect(client.permissions).toBeDefined();
            expect(client.permissions.sub).toBe('admin@admin.com');
            done();
        };
        auth(client, EMAIL, PASSWORD, callback);
    });

});
