declare module "mosca" {
    export class Server extends EventEmitter {
        constructor(opts: any);
        public toString: () => string;
        public subscribe: (topic, callback, done) => any;
        public publish: (packet, client, callback) => any;
        public authenticate: (client, username, password, callback) => any;
        public on: any;
        public authorizePublish: any;
        public authorizeSubscribe: any;
    }
}
