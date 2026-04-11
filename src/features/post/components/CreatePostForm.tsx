"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createPost } from "@/features/post/mutations/createPost";

import CardWrapper from "./CardWrapper";

import SubmitButton from "./SubmitButton";
import { useActionState } from "react";

function CreatePostForm() {
  //with useTransition
  // const [isPending, startTransition] = useTransition();
  // const createPostAction = (formData: FormData) => {
  //   startTransition(async () => {
  //     await createPost(formData);
  //   });
  // };

  const [actionState, formAction] = useActionState(createPost, { message: "" });

  return (
    <CardWrapper
      title="Create new post"
      description="This will create a new post"
    >
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={(actionState.payload?.get("title") as string) ?? ""}
          />
        </div>

        <div>
          <Label htmlFor="body">Description</Label>
          <Textarea
            name="body"
            id="body"
            defaultValue={(actionState.payload?.get("body") as string) ?? ""}
          />
        </div>

        {/* <Button
          type="submit"
          disabled={isPending}
          className={isPending ? "opacity-50" : "opacity-100"}
        >
          {isPending ? (
            <div className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" size={16} />{" "}
              <span>Creating...</span>
            </div>
          ) : (
            "Create"
          )}
        </Button> */}
        <SubmitButton label="Create" isCreate={true} />
      </form>
      <span>{actionState.message}</span>
    </CardWrapper>
  );
}

export default CreatePostForm;
