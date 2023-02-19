import { Static, Type } from "@sinclair/typebox";

const CoreUserSchema = {
  username: Type.String(),
  email: Type.String(),
  age: Type.Number({ minimum: 18 }),
};

export const UserSchema = Type.Object({
  ...CoreUserSchema,
  password: Type.String({ minLength: 4 }),
});

export const UserSchemaResponse = Type.Object({
  ...CoreUserSchema,
  id: Type.Number(),
});

export type UserSchemaType = Static<typeof UserSchema>;
export type UserSchemaResponseType = Static<typeof UserSchemaResponse>;
