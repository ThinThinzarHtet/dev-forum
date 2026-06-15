import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { MoveUpRight, SquarePen } from "lucide-react";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { cn } from "@/lib/utils";
import { Post, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./DeleteButton";
import { isOwner } from "@/lib/isOwner";

interface Props extends Post {
  isPostDetail?: boolean;
  user: User;
}
async function PostItem({
  id,
  title,
  body,
  isPostDetail = false,
  status,
  user,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className={cn(!isPostDetail && "line-clamp-2")}>
              {body}
            </CardDescription>

            <p className="text-sm font-medium text-muted-foreground">
              By {user?.name || "hello"}
            </p>
          </div>

          <Badge variant={status === "IN_PROGRESS" ? "outline" : "default"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      {!isPostDetail && (
        <CardContent className="space-x-4">
          <Button asChild>
            <Link href={singlePostPath(id)}>
              <MoveUpRight /> Read
            </Link>
          </Button>
          {(await isOwner(user.id)) && (
            <Button variant="secondary" asChild>
              <Link href={editPostPath(id)}>
                <SquarePen /> Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}

      {isPostDetail && (await isOwner(user.id)) && <DeleteButton id={id} />}
    </Card>
  );
}

export default PostItem;
