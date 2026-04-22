"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postUpdateSchema } from "../schemas";

// export const editPost = async (id: string, formData: FormData) => {
//   const data = {
//     id,
//     title: formData.get("title"),
//     body: formData.get("body"),
//   };

//   await prisma.post.update({
//     where: { id: data.id as string },
//     data: {
//       title: data.title as string,
//       body: data.body as string,
//     },
//   });

//   revalidatePath(postsPath);
//   redirect(postsPath);
// };

export const editPost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, body } }) => {
    try {
      const data = {
        id,
        title,
        body,
      };

      await prisma.post.update({
        where: { id: data.id },
        data: {
          title: data.title,
          body: data.body,
        },
      });

      revalidatePath(postsPath);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong while updating the post");
    }
  });
