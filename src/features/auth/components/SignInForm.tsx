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
import { authSignInSchema, authSignUpSchema } from "../schemas";
import { signUp } from "../mutations/singup";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";
import { signIn } from "../mutations/signin";
import Link from "next/link";
import { resetPasswordPath, signUpPath } from "@/path";
import GithubOauthButton from "./GithubOauthButton";
import { redirect } from "next/navigation";

function SignInForm() {
  //with next safe action, we can use the useAction hook to execute the createPost action and get the status of the action.
  const { execute, hasErrored, hasSucceeded, isPending, result } =
    useAction(signIn);

  const form = useForm<z.infer<typeof authSignInSchema>>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof authSignInSchema>) {
    // Do something with the form values.

    const { email, password } = data;
    execute({ email, password });
  }

  useEffect(() => {
    const data = result.data;
    if (!data) {
      return;
    }

    if (data?.success) {
      toast.success("Signed in successfully");
      redirect("/");
    }

    if (!data?.success) {
      toast.error(data?.error);
    }
  }, [result]);

  return (
    <CardWrapper
      title="Sign In"
      description="Sign in to your account to start using the app"
      footer={<Footer />}
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

          <SubmitButton isPending={isPending} label="Sign In" isCreate={true} />
        </FieldGroup>
      </form>
      <hr className="text-muted-foreground my-6" />
      <GithubOauthButton />
    </CardWrapper>
  );
}

export default SignInForm;

const Footer = () => {
  return (
    <div className="text-sm font-medium text-muted-foreground flex justify-between w-full">
      <p>
        Don&apos;t have an account?{" "}
        <Link
          href={signUpPath}
          className="underline text-blue-600 hover:text-blue-400"
        >
          Sign up
        </Link>
      </p>

      <Link
        href={resetPasswordPath}
        className="underline text-blue-600 hover:text-blue-400"
      >
        Forgot password?
      </Link>
    </div>
  );
};
