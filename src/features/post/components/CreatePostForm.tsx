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

function CreatePostForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new post</CardTitle>
        <CardDescription>This will create new post</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createPost} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" />
          </div>

          <div>
            <Label htmlFor="body">Description</Label>
            <Textarea name="body" id="body" />
          </div>

          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreatePostForm;
