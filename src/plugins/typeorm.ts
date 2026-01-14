import "reflect-metadata";
import fp from "fastify-plugin";
import { DataSource } from "typeorm";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: DataSource;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const AppDataSource = new DataSource({
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
  } catch (error) {
    fastify.log.warn("TypeORM Database not available, skipping connection.");
  }
});
