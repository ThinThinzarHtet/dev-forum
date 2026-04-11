"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createPost } from "@/features/post/mutations/createPost";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";

function CreatePostForm() {
  const [isPending, startTransition] = useTransition();

  const createPostAction = (formData: FormData) => {
    startTransition(async () => {
      await createPost(formData);
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new post</CardTitle>
        <CardDescription>This will create new post</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createPostAction} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" />
          </div>

          <div>
            <Label htmlFor="body">Description</Label>
            <Textarea name="body" id="body" />
          </div>

          <Button
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
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreatePostForm;
