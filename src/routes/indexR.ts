import { FastifyInstance } from "fastify";
import { loginUser, postUser } from "../controllers/indexC";
import {
  UserLoginResponseSchema,
  UserLoginResponseSchemaType,
  UserLoginSchema,
  UserLoginSchemaType,
  UserSchema,
  UserSchemaResponse,
  UserSchemaResponseType,
  UserSchemaType,
} from "../schemas/User.schema";

async function indexRouter(fastify: FastifyInstance) {
  fastify.get("/", async (req, rep) => {
    rep.send({ ping: "pong" });
  });

  fastify.post<{
    Body: UserLoginSchemaType;
    Reply: UserLoginResponseSchemaType;
  }>(
    "/login-user",
    {
      schema: {
        body: UserLoginSchema,
        response: { 200: UserLoginResponseSchema },
      },
    },
    loginUser
  );
  fastify.post<{ Body: UserSchemaType; Reply: UserSchemaResponseType }>(
    "/create-user",
    { schema: { body: UserSchema, response: { 200: UserSchemaResponse } } },
    postUser
  );
}

export default indexRouter;
