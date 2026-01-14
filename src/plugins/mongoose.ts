import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/database";

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000, // Short timeout for dev
    });
    fastify.decorate("mongoose", mongoose);
    fastify.log.info("Mongoose Database connection established");

    fastify.addHook("onClose", async () => {
      await mongoose.connection.close();
    });
  } catch (error) {
    fastify.log.warn("Mongoose Database not available, skipping connection.");
  }
});
