import axios from "axios";

var p = axios.post("http://localhost:3000/api/tokens", {
    user: {
        email: "admin@admin.com",
        password: "password123"
    }
});

export function fetchRealJWT() {
    function ok(resp) {
        return resp.data.token.encoded;
    }
    function no() {
        console.log(`
        We test the MQTT server against a real running API instance on localhost:3000.
        Something went wrong while testing.
        Usually, this means you are not running a server.
        `);
    }
    return p.then(ok, no);
}