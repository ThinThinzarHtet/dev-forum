"use server";

import { prisma } from "@/lib/prisma";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";

import { postDeleteSchema } from "../schemas";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { isOwner } from "@/lib/isOwner";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    //login or not
    const session = await getSession();
    if (!session) {
      redirect(signInPath);
    }

    //is owner or not
    const owner = await isOwner(session.user.id);
    if (!owner) {
      throw new Error("You are not authorized to delete this post");
    }

    await prisma.post.delete({ where: { id } });
    revalidatePath(postsPath);
    //redirect(postsPath);
  });
