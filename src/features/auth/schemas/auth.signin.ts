import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const authSignInSchema = z.object({
  ...authBaseSchema,
});
