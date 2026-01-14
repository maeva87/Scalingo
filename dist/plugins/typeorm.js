"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const typeorm_1 = require("typeorm");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    const AppDataSource = new typeorm_1.DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "password",
        database: process.env.DB_NAME || "database",
        synchronize: true, // Only for development!
        logging: false,
        entities: [__dirname + "/../entities/*.ts"],
        migrations: [],
        subscribers: [],
    });
    try {
        await AppDataSource.initialize();
        fastify.decorate("db", AppDataSource);
        fastify.log.info("TypeORM Database connection established");
        fastify.addHook("onClose", async (instance) => {
            await instance.db.destroy();
        });
    }
    catch (error) {
        fastify.log.error(error, "Error during TypeORM Database initialization");
        process.exit(1);
    }
});
