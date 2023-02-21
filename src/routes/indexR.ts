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
  fastify.get<{ Reply: UserSchemaResponseType | { message: string } }>(
    "/profile",
    { schema: { response: { 200: UserSchemaResponse } } },
    async (req, rep) => {
      const user = req.session.get("user");
      if (!user) {
        return rep.code(401).send({ message: "first you have to login" });
      }
      return rep.send(user as UserSchemaResponseType);
    }
  );
  fastify.get("/logout", async (req, rep) => {
    await req.session.destroy();
    return rep.send({ message: "success" });
  });
}

export default indexRouter;
