import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Post } from "../types/post";
import { Button } from "@/components/ui/button";
import { MoveUpRight, SquarePen } from "lucide-react";
import Link from "next/link";
import { EDIT_POST, SINGLE_POST } from "@/path";
import { cn } from "@/lib/utils";
import { deletePost } from "../mutations/deletePost";

interface Props extends Post {
  isPostDetail?: boolean;
}
function PostItem({ id, title, body, isPostDetail = false }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(!isPostDetail && "line-clamp-2")}>
          {body}
        </CardDescription>
      </CardHeader>
      {!isPostDetail && (
        <CardContent className="space-x-4">
          <Button asChild>
            <Link href={SINGLE_POST(id)}>
              <MoveUpRight /> Read
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href={EDIT_POST(id)}>
              <SquarePen /> Edit
            </Link>
          </Button>
        </CardContent>
      )}
      {isPostDetail && (
        <CardFooter>
          <form action={deletePost.bind(null, id as string)}>
            <Button variant={"destructive"} size={"sm"}>
              Delete
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}

export default PostItem;
