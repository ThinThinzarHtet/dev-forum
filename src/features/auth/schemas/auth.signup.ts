import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const authSignUpSchema = z
  .object({
    ...authBaseSchema,
    name: z.string().min(3),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
