import Fastify, { FastifyInstance } from "fastify";
import path from "path";
import autoload from "@fastify/autoload";
import * as dotenv from "dotenv";

dotenv.config();

const buildApp = async (): Promise<FastifyInstance> => {
  const fastify = Fastify({
    logger: true,
    pluginTimeout: 20000,
  });

  // Load plugins
  await fastify.register(autoload, {
    dir: path.join(__dirname, "plugins"),
  });

  // Load routes
  await fastify.register(autoload, {
    dir: path.join(__dirname, "routes"),
  });

  return fastify;
};

export { buildApp };
