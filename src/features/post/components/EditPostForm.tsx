"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../types/post";
import { editPost } from "../mutations/editPost";
// import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import CardWrapper from "./CardWrapper";
import SubmitButton from "./SubmitButton";

interface EditPostFormProps {
  post: Post;
}
function EditPostForm({ post }: EditPostFormProps) {
  // const [isPending, startTransition] = useTransition();

  // const editPostAction = (formData: FormData) => {
  //   startTransition(async () => {
  //     await editPost(post.id as string, formData);
  //   });
  // };
  return (
    <CardWrapper
      title="Update existing post"
      description="This will update the existing post"
    >
      <form
        action={editPost.bind(null, post?.id as string)}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={post?.title}
          />
        </div>

        <div>
          <Label htmlFor="body">Description</Label>
          <Textarea name="body" id="body" defaultValue={post?.body} />
        </div>

        {/* <Button
            type="submit"
            disabled={isPending}
            className={isPending ? "opacity-50" : "opacity-100"}
          >
            {isPending ? (
              <div className="flex gap-2 items-center">
                <LoaderCircle className="animate-spin" size={16} />{" "}
                <span>Updating...</span>
              </div>
            ) : (
              "Update"
            )}
          </Button> */}
        <SubmitButton label="Update" isCreate={false} />
      </form>
    </CardWrapper>
  );
}

export default EditPostForm;
