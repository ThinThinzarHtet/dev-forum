"use server";
import { actionClient } from "@/lib/safe-action";

import { authChangePasswordSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

export const changePassword = actionClient
  .inputSchema(authChangePasswordSchema)
  .action(async ({ parsedInput: { newPassword, token } }) => {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword, // required
          token, // required
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to request password reset");
    }

    redirect(signInPath);
  });
