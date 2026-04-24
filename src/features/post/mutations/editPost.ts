"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postUpdateSchema } from "../schemas";

export const editPost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, body, status} }) => {
    try {
    
      await prisma.post.update({
        where: { id},
        data: {
          title,
          body,
          status
        },
      });

      revalidatePath(postsPath);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while updating the post");
    }
  });
