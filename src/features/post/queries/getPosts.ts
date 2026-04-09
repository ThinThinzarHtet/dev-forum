import { dummyPosts } from "@/data";
import { Post } from "../types/post";

export const getPosts = async (): Promise<Post[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    resolve(dummyPosts);
  });
};
