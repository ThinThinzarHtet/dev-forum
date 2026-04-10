import Heading from "@/components/Heading";
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
import PostList from "@/features/post/components/PostList";
import { createPost } from "@/features/post/mutations/createPost";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function Posts() {
  return (
    <main>
      <Heading title="All posts" description="View all forum posts" />

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

      <Suspense
        fallback={
          <p className="text-black dark:text-white">Fetching posts...</p>
        }
      >
        <PostList />
      </Suspense>
    </main>
  );
}

export default Posts;
