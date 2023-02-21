import { FastifyInstance } from "fastify";
import { prisma } from "../utils/database";
import {
  postRequestSchema,
  postRequestSchemaType,
  postResponseSchema,
  postResponseSchemaType,
} from "../schemas/post.schema";
import { Prisma, User } from "@prisma/client";

async function postPublicRouter(fastify: FastifyInstance) {
  fastify.get("/", async (req, rep) => {
    const posts = await prisma.post.findMany({
      take: 10,
      include: { user: { select: { email: true } } },
    });
    return rep.send(posts);
  });
}

async function postPrivateRouter(fastify: FastifyInstance) {
  fastify.addHook("onRequest", (req, rep, done) => {
    if (req.session.get("user")) return done();
    return rep
      .code(401)
      .send({ message: "You don't have access to this url " });
  });
  fastify.post<{
    Body: postRequestSchemaType;
    Reply: postResponseSchemaType | { message: string };
  }>(
    "/",
    {
      schema: {
        body: postRequestSchema,
        response: { 201: postResponseSchema },
      },
    },
    async (req, rep) => {
      const { content, title } = req.body;
      const rawUser: User = req.session.get("user");
      const user = await prisma.user.findUnique({ where: { id: rawUser.id } });
      if (user) {
        const newPost = await prisma.post.create({
          data: { content, title, user_id: user.id },
        });
        return rep.code(201).send(newPost);
      }
      rep.code(400).send({ message: "something went wrong" });
    }
  );
}

export { postPublicRouter, postPrivateRouter };
