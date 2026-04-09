import { dummyPosts } from "@/data";
import { Post } from "../types/post";

export const getPost = async (id: string): Promise<Post | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    resolve(dummyPosts.find((post) => post.id === parseInt(id)));
  });
};
