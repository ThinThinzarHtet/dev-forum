import PostItem from "@/features/post/components/PostItem";
import { getPost } from "@/features/post/queries/getPost";
import { getPosts } from "@/features/post/queries/getPosts";
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

// Return a list of `params` to populate the [id] dynamic segment
// export async function generateStaticParams() {
//   const posts = await getPosts();

//   return posts.map((post) => ({
//     id: post.id,
//   }));
// }
