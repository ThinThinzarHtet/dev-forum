import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface PostWithUser extends Post {
  user: User;
}

export const getPost = async (id: string): Promise<PostWithUser | null> => {
  return await prisma.post.findUnique({
    where: { id },
    include: { user: true },
  });
};
