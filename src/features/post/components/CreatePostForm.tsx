"use client";

import { Input } from "@/components/ui/input";

import { createPost } from "@/features/post/mutations/createPost";

import CardWrapper from "./CardWrapper";
import { useAction } from "next-safe-action/hooks";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { postCreateSchema } from "../schemas";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

function CreatePostForm() {
  //with next safe action, we can use the useAction hook to execute the createPost action and get the status of the action.
  const { execute, hasErrored, hasSucceeded, isPending } =
    useAction(createPost);
  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(data: z.infer<typeof postCreateSchema>) {
    // Do something with the form values.
    console.log(data);
    const { title, body } = data;
    execute({ title, body });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Post created successfully");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Create new post"
      description="This will create a new post"
    >
      <form
        id="form-rhf-demo"
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

          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-fit"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex gap-2 items-center">
                <LoaderCircle className="animate-spin" size={16} />{" "}
                <span>{"Creating..."}</span>
              </div>
            ) : (
              <p>Create</p>
            )}
          </Button>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}

export default CreatePostForm;
