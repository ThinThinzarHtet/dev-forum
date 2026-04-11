"use server";

import { prisma } from "@/lib/prisma";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editPost = async (id: string, formData: FormData) => {
  const data = {
    id,
    title: formData.get("title"),
    body: formData.get("body"),
  };
  console.log(data);

  await prisma.post.update({
    where: { id: data.id as string },
    data: {
      title: data.title as string,
      body: data.body as string,
    },
  });

  revalidatePath(POSTS);
  redirect(POSTS);
};
