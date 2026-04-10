import { Post } from "../types/post";
import { prisma } from "@/lib/prisma";

export const getPost = async (id: string): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: { id },
  });
};
