import { Static, Type } from "@sinclair/typebox";

const CoreUserSchema = {
  username: Type.String(),
  email: Type.String({ format: "email" }),
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

export const UserLoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});

export const UserLoginResponseSchema = Type.Object({
  id: Type.Number(),
  ...CoreUserSchema,
});

export type UserLoginResponseSchemaType = Static<
  typeof UserLoginResponseSchema
>;
export type UserLoginSchemaType = Static<typeof UserLoginSchema>;
export type UserSchemaType = Static<typeof UserSchema>;
export type UserSchemaResponseType = Static<typeof UserSchemaResponse>;
