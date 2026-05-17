import * as z from "zod";

export const authChangePasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
  token: z.string(),
});
