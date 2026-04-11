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
import { Post } from "../types/post";
import { editPost } from "../mutations/editPost";

interface EditPostFormProps {
  post: Post;
}
function EditPostForm({ post }: EditPostFormProps) {
  console.log("🚀 ~ EditPostForm ~ post:", post);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update existing post</CardTitle>
        <CardDescription>This will update the existing post</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={editPost.bind(null, post.id as string)}
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

          <Button type="submit">Update</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditPostForm;
