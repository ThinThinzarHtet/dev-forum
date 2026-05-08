"use server";

import { auth } from "@/lib/auth";
import { postsPath, signInPath } from "@/path";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);
    throw new Error("Sign out failed");
  }
  redirect(signInPath);
};
