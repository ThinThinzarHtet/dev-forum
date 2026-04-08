import { dummyPosts } from "@/data";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePost({ params }: Props) {
  const { id } = await params;

  const post = dummyPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <h2>Post not found.</h2>;
  }
  return (
    <div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.description}</p>
      <p className="text-sm font-medium text-gray-400 ">{post.body}</p>
    </div>
  );
}

export default SinglePost;
