"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const User_1 = require("../entities/User");
const Log_1 = __importDefault(require("../models/Log"));
async function default_1(fastify) {
    fastify.get("/ping", async () => {
        // Test TypeORM (SQL)
        const userRepository = fastify.db.getRepository(User_1.User);
        const sqlCount = await userRepository.count();
        // Test Mongoose (NoSQL)
        const nosqlCount = await Log_1.default.countDocuments();
        return {
            status: "ok",
            databases: {
                sql: { status: "connected", userCount: sqlCount },
                nosql: { status: "connected", logCount: nosqlCount },
            },
            timestamp: new Date().toISOString(),
        };
    });
}
