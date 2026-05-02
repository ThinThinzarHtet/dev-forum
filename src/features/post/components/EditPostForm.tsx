"use client";

import { Input } from "@/components/ui/input";

import { editPost } from "../mutations/editPost";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { postUpdateSchema } from "../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import CardWrapper from "../../../components/CardWrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { postsPath } from "@/path";
import SubmitButton from "../../../components/SubmitButton";
import { Post } from "../../../../generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const { execute, hasErrored, hasSucceeded, isPending } = useAction(editPost);
  const router = useRouter();
  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post?.id as string,
      title: post?.title,
      body: post?.body,
      status: post?.status,
    },
  });

  function onSubmit(data: z.infer<typeof postUpdateSchema>) {
    // Do something with the form values.
    console.log(data);
    const { id, title, body, status } = data;
    execute({ id, title, body, status });
  }

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Post updated successfully");
      router.push(postsPath);
    }

    if (hasErrored) {
      toast.error("Something went wrong while updating the post");
    }
  }, [hasErrored, hasSucceeded, router]);

  return (
    <CardWrapper
      title="Update existing post"
      description="This will update the existing post"
    >
      <form
        id="form-rhf-demo-update"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-body">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-body"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-status">Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-rhf-select-language"
                    aria-invalid={fieldState.invalid}
                    className="w-fit"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <SubmitButton label="Update" isPending={isPending} isCreate={false} />
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}

export default EditPostForm;
