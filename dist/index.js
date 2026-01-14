"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const start = async () => {
    const app = await (0, app_1.buildApp)();
    const port = parseInt(process.env.PORT || "3000");
    const host = process.env.HOST || "0.0.0.0";
    try {
        await app.listen({ port, host });
        console.log(`Server listening on ${host}:${port}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
