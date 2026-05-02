"use server";
import { actionClient } from "@/lib/safe-action";

import { authSignInSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { postsPath } from "@/path";
import { redirect } from "next/navigation";

export const signIn = actionClient
  .inputSchema(authSignInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await auth.api.signInEmail({ body: { email, password } });
    } catch (error) {
      console.log(error);
      throw new Error("Sign in failed");
    }

    redirect(postsPath);
  });
