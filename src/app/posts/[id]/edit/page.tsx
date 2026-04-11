import EditPostForm from "@/features/post/components/EditPostForm";
import { getPost } from "@/features/post/queries/getPost";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}
async function EditPost({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  );
}

export default EditPost;
