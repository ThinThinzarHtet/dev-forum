"use client";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import CardWrapper from "@/components/CardWrapper";
import SubmitButton from "@/components/SubmitButton";
import { authSignUpSchema } from "../schemas";
import { signUp } from "../mutations/singup";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";

function SignUpForm() {
  //with next safe action, we can use the useAction hook to execute the createPost action and get the status of the action.
  const { execute, hasErrored, hasSucceeded, isPending } = useAction(signUp);

  const form = useForm<z.infer<typeof authSignUpSchema>>({
    resolver: zodResolver(authSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof authSignUpSchema>) {
    // Do something with the form values.

    const { name, email, password, confirmPassword } = data;
    execute({ name, email, password, confirmPassword });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Account created successfully");
    }

    if (hasErrored) {
      toast.error("Something went wrong while sign up");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Sign Up"
      description="Create an account to start using the app"
    >
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="john.doe@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="********"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-confirmPassword"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="********"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <SubmitButton isPending={isPending} label="Sign Up" isCreate={true} />
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}

export default SignUpForm;
