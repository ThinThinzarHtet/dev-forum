import PostItem from "@/features/post/components/PostItem";
import { getPosts } from "@/features/post/queries/getPosts";
async function PostList() {
  const posts = await getPosts();
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem {...post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
