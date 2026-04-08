import { dummyPosts } from "@/data";
import PostItem from "@/features/post/components/PostItem";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePost({ params }: Props) {
  const { id } = await params;

  const post = dummyPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <h2>Post not found.</h2>;
  }
  return <PostItem {...post} isPostDetail={true} />;
}

export default SinglePost;
