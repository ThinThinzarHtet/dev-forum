"use server";

import { ActionState, actionStateFilter } from "@/lib/actionStateFilter";
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const createPostSchema = z.object({
  title: z.string().min(3).max(255),
  body: z.string().min(3),
});

export const createPost = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = createPostSchema.parse({
      title: formData.get("title"),
      body: formData.get("body"),
    });

    await prisma.post.create({
      data: {
        title: data.title as string,
        body: data.body as string,
      },
    });

    revalidatePath(POSTS);
    return { message: "Post created successfully" };
  } catch (error) {
    return actionStateFilter(error, formData);
  }
};
