"use server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { authSignUpSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

export const signUp = actionClient
  .inputSchema(authSignUpSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    try {
      await auth.api.signUpEmail({ body: { email, name, password } });
    } catch (error) {
      console.log(error);
      throw new Error("Sign up failed");
    }
    redirect(signInPath);
  });
