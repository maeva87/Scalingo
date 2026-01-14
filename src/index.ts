import { buildApp } from "./app";

const start = async () => {
  const app = await buildApp();
  const port = parseInt(process.env.PORT || "3000");
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
    console.log(`Server listening on ${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
