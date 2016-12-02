declare module "mosca" {
    interface ServerOpts {
        allowNonSecure?: boolean,
        port?: number,
        logger?: {
            level: string
        },
        http?: {
            port?: number,
            bundle?: boolean,
            static?: string
        }
    }

    export class Server extends NodeJS.EventEmitter {
        constructor(opts: ServerOpts);
        public toString: () => string;
        public subscribe: (topic, callback, done) => any;
        public publish: (packet, client, callback) => any;
        public authenticate: (client, username, password, callback) => any;
        public authorizePublish: any;
        public authorizeSubscribe: any;
    }
}
