"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postUpdateSchema } from "../schemas";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export const editPost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, body, status } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }
    try {
      await prisma.post.update({
        where: { id },
        data: {
          title,
          body,
          status,
        },
      });

      revalidatePath(postsPath);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while updating the post");
    }
  });
