"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./src/server");
const port = Number(process.env.PORT) || 4000;
const start = async () => {
    try {
        await server_1.app.listen({ port });
    }
    catch (err) {
        server_1.app.log.error(err);
        process.exit(1);
    }
};
void start();
