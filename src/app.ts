import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { prisma } from "./utils/database";
import indexRouter from "./routes/indexR";
import fastifyCors from "@fastify/cors";
import { postPublicRouter, postPrivateRouter } from "./routes/postR";

export const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyBcrypt, { saltWorkFactor: 10 });
app.register(fastifyCookie);
app.register(fastifySession, {
  secret: "1acb34ef11653f5e37fcc108cbf560a54cc81b5df61f576effb4fb7b5b96ee0b",
  cookie: { secure: false },
});
app.register(fastifyCors, {
  credentials: true,
  origin: "http://localhost:5173",
});
app.register(indexRouter);

app.register(postPublicRouter, { prefix: "/post" });
app.register(postPrivateRouter, { prefix: "/post" });

async function main() {
  try {
    if (process.env.NODE_ENV === "production") {
      app.listen({ port: 8000, host: "0.0.0.0" });
    } else {
      app.listen({ port: 8000 });
    }
  } catch (err) {
    prisma.$disconnect();
    console.log(err);
    process.exit(1);
  }
}

main();
