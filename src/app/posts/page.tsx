import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { dummyPosts } from "@/data";
import PostItem from "@/features/post/components/PostItem";
import { SINGLE_POST } from "@/path";
import Link from "next/link";

function Posts() {
  return (
    <main>
      <Heading title="All posts" description="View all forum posts" />
      <div className="space-y-6">
        {dummyPosts.map((post) => (
          <PostItem {...post} key={post.id} />
        ))}
      </div>
    </main>
  );
}

export default Posts;
