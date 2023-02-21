import { Static, Type } from "@sinclair/typebox";

const corePost = {
  title: Type.String({ maxLength: 255 }),
  content: Type.String(),
};

export const postRequestSchema = Type.Object({
  ...corePost,
});

export const postResponseSchema = Type.Object({
  id: Type.Number(),
  ...corePost,
});

export type postResponseSchemaType = Static<typeof postResponseSchema>;
export type postRequestSchemaType = Static<typeof postRequestSchema>;
