import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { prisma } from "./utils/database";
import indexRouter from "./routes/indexR";

export const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyBcrypt, { saltWorkFactor: 10 });
app.register(indexRouter);

async function main() {
  try {
    app.listen({ port: 8000 });
  } catch (err) {
    prisma.$disconnect();
    console.log(err);
    process.exit(1);
  }
}

main();
