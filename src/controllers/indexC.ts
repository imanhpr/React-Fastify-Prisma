import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchemaResponseType, UserSchemaType } from "../schemas/User.schema";

import { app } from "../app";
import { prisma } from "../utils/database";

export async function postUser(
  req: FastifyRequest<{ Body: UserSchemaType; Reply: UserSchemaResponseType }>,
  rep: FastifyReply
) {
  try {
    const { username, email, age, password } = req.body;
    const hashedPassword = await app.bcrypt.hash(password);
    const user = await prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        username,
        age,
      },
    });
    const response: UserSchemaResponseType = {
      username: user.username,
      email: user.email,
      age: user.age,
      id: user.id,
    };
    rep.status(200).send(response);
  } catch (err) {
    rep.status(500).send({ message: "Internal Server Error" });
  }
}
