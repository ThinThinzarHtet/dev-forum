"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "../mutations/deletePost";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { postsPath } from "@/path";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
}

function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(deletePost);

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Post deleted successfully");
      router.push(postsPath);
    }

    if (hasErrored) {
      toast.error("Something went wrong while deleting the post");
    }
  }, [hasErrored, hasSucceeded, router]);
  return (
    <CardFooter>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size={"sm"}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={"destructive"}
              disabled={isPending}
              onClick={() => execute({ id })}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  );
}

export default DeleteButton;
