import Heading from "@/components/Heading";
import CreatePostForm from "@/features/post/components/CreatePostForm";
import PostList from "@/features/post/components/PostList";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function Posts() {
  return (
    <main>
      <Heading title="All posts" description="View all forum posts" />
      <CreatePostForm />
      <Suspense
        fallback={
          <p className="text-black dark:text-white">Fetching posts...</p>
        }
      >
        <PostList />
      </Suspense>
    </main>
  );
}

export default Posts;
