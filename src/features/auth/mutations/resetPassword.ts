"use server";
import { actionClient } from "@/lib/safe-action";

import { authResetPasswordSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { changePasswordPath } from "@/path";

export const resetPassword = actionClient
  .inputSchema(authResetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      await auth.api.requestPasswordReset({
        body: {
          email,
          redirectTo: `${process.env.BETTER_AUTH_URL}/${changePasswordPath}`,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to request password reset");
    }
  });
