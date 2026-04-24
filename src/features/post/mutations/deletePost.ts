"use server";

import { prisma } from "@/lib/prisma";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";

import { postDeleteSchema } from "../schemas";
import { actionClient } from "@/lib/safe-action";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.post.delete({ where: { id } });
    revalidatePath(postsPath);
    //redirect(postsPath);
  });
