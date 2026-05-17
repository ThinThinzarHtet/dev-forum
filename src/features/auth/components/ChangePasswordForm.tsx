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
import { authChangePasswordSchema } from "../schemas";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { changePassword } from "../mutations/changePassword";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  //with next safe action, we can use the useAction hook to execute the createPost action and get the status of the action.
  const { execute, hasErrored, hasSucceeded, isPending } =
    useAction(changePassword);

  const form = useForm<z.infer<typeof authChangePasswordSchema>>({
    resolver: zodResolver(authChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      token: token,
    },
  });

  function onSubmit(data: z.infer<typeof authChangePasswordSchema>) {
    // Do something with the form values.

    const { newPassword, token } = data;
    execute({ newPassword, token });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Your password has been changed successfully");
    }

    if (hasErrored) {
      toast.error("Something went wrong while changing your password");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper title="Change Password" description="Enter your new password">
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-newPassword">
                  New Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-newPassword"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="********"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <SubmitButton
            isPending={isPending}
            label="Change Password"
            isCreate={true}
          />
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}

export default ChangePasswordForm;
