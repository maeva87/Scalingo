"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/database";
    try {
        await mongoose_1.default.connect(uri);
        fastify.decorate("mongoose", mongoose_1.default);
        fastify.log.info("Mongoose Database connection established");
        fastify.addHook("onClose", async () => {
            await mongoose_1.default.connection.close();
        });
    }
    catch (error) {
        fastify.log.error(error, "Error during Mongoose Database initialization");
        process.exit(1);
    }
});
