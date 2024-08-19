"use client";

import { OAuthButtons } from "@/components/auth/oauth-button";
import { SubmitButton } from "@/components/ui/submit-button";
import { DEFAULT_VERIFY_REDIRECT, siteConfig } from "@/config/site";
import { signup } from "@template/auth/action";
import { Button } from "@template/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@template/ui/card";
import { TriangleAlertIcon } from "@template/ui/icon";
import { Input } from "@template/ui/input";
import { Label } from "@template/ui/label";
import { toast } from "@template/ui/lib";
import { PasswordInput } from "@template/ui/password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function Signup() {
  const [state, formAction] = useFormState(signup, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      toast(state.success, {
        icon: <TriangleAlertIcon className="h-5 w-5 text-destructive" />,
      });
      setTimeout(() => {
        router.push(`${DEFAULT_VERIFY_REDIRECT}?email=${state.success}`);
      }, 2000);
    }
  }, [router, state?.success]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{siteConfig.name} Sign Up</CardTitle>
        <CardDescription>Sign up to start using the app</CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthButtons />
        <div className="my-2 flex items-center">
          <div className="flex-grow border-muted border-t" />
          <div className="mx-2 text-muted-foreground">or</div>
          <div className="flex-grow border-muted border-t" />
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Your Name</Label>
            <Input required placeholder="John Wick" name="fullName" />
          </div>
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
          <div>
            <Link href={"/login"}>
              <span className="p-0 font-medium text-xs underline-offset-4 hover:underline">
                Already signed up? Login instead.
              </span>
            </Link>
          </div>

          <SubmitButton className="w-full"> Sign Up</SubmitButton>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
