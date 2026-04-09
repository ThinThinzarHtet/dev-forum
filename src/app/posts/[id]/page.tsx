import { dummyPosts } from "@/data";
import PostItem from "@/features/post/components/PostItem";
import { getPost } from "@/features/post/queries/getPost";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePost({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }
  return <PostItem {...post} isPostDetail={true} />;
}

export default SinglePost;
