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
import { authResetPasswordSchema } from "../schemas";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";
import { resetPassword } from "../mutations/resetPassword";

function ResetPasswordForm() {
  //with next safe action, we can use the useAction hook to execute the createPost action and get the status of the action.
  const { execute, hasErrored, hasSucceeded, isPending } =
    useAction(resetPassword);

  const form = useForm<z.infer<typeof authResetPasswordSchema>>({
    resolver: zodResolver(authResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof authResetPasswordSchema>) {
    // Do something with the form values.

    const { email } = data;
    execute({ email });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Reset password email sent successfully");
    }

    if (hasErrored) {
      toast.error("Something went wrong while requesting password reset");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Reset Password"
      description="Enter your email to reset your password"
    >
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
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

          <SubmitButton
            isPending={isPending}
            label="Reset Password"
            isCreate={true}
          />
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}

export default ResetPasswordForm;
