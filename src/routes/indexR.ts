import { FastifyInstance } from "fastify";
import { postUser } from "../controllers/indexC";
import {
  UserSchema,
  UserSchemaResponse,
  UserSchemaResponseType,
  UserSchemaType,
} from "../schemas/User.schema";

async function indexRouter(fastify: FastifyInstance) {
  fastify.get("/", async (req, rep) => {
    rep.send({ ping: "pong" });
  });

  fastify.post<{ Body: UserSchemaType; Reply: UserSchemaResponseType }>(
    "/create-user",
    { schema: { body: UserSchema, response: { 200: UserSchemaResponse } } },
    postUser
  );
}

export default indexRouter;
