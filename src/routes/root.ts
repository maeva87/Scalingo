import { FastifyInstance } from "fastify";
import { User } from "../entities/User";
import Log from "../models/Log";

export default async function (fastify: FastifyInstance) {
  fastify.get("/ping", async () => {
    // Test TypeORM (SQL)
    process.env.PORT
    let sqlCount = 0;
    let sqlStatus = "not connected" + process.env.DB_HOST;
    if (fastify.db && fastify.db.isInitialized) {
      const userRepository = fastify.db.getRepository(User);
      sqlCount = await userRepository.count();
      sqlStatus = `connected${process.env.DB_HOST}`;
    }

    // Test Mongoose (NoSQL)
    let nosqlCount = 0;
    let nosqlStatus = "not connected";
    if (fastify.mongoose && fastify.mongoose.connection.readyState === 1) {
      nosqlCount = await Log.countDocuments();
      nosqlStatus = "connected";
    }

    return {
      status: "ok",
      databases: {
        sql: { status: sqlStatus, userCount: sqlCount },
        nosql: { status: nosqlStatus, logCount: nosqlCount },
      },
      timestamp: new Date().toISOString(),
    };
  });
}
