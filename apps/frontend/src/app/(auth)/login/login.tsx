"use client";

import { OAuthButtons } from "@/components/auth/oauth-button";
import { SubmitButton } from "@/components/ui/submit-button";
import { siteConfig } from "@/config/site";
import { login } from "@template/auth/action";
import { Button } from "@template/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@template/ui/card";
import { Input } from "@template/ui/input";
import { Label } from "@template/ui/label";
import { PasswordInput } from "@template/ui/password-input";
import Link from "next/link";
import { useFormState } from "react-dom";

export function Login() {
  const [state, formAction] = useFormState(login, null);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{siteConfig.name} Log In</CardTitle>
        <CardDescription>
          Log in to your account to create and manage invitation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthButtons />
        <div className="my-2 flex items-center">
          <div className="flex-grow border-muted border-t" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-muted border-t" />
        </div>
        <form action={formAction} className="grid gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          <div className="flex flex-wrap justify-between">
            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/signup"}>Not signed up? Sign up now.</Link>
            </Button>
            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/reset-password"}>Forgot password?</Link>
            </Button>
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 font-medium text-[0.8rem] text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="ml-4" key={err}>
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError ? (
            <p className="rounded-lg border bg-destructive/10 p-2 font-medium text-[0.8rem] text-destructive">
              {state?.formError}
            </p>
          ) : null}
          <SubmitButton className="w-full">Log In</SubmitButton>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
