"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import {
  logout,
  resendVerificationEmail as resendEmail,
  verifyEmail,
} from "@template/auth/action";
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export const VerifyCode = () => {
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
  const [resendState, resendAction] = useFormState(resendEmail, null);

  const codeFormRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  if (!email) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  useEffect(() => {
    if (resendState?.success) {
      toast("Email sent!");
    }
    if (resendState?.error) {
      toast(resendState.error, {
        icon: <TriangleAlertIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [resendState]);

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast(verifyEmailState.error, {
        icon: <TriangleAlertIcon className="h-5 w-5 text-destructive" />,
      });
    } else if (verifyEmailState?.success) {
      router.push(DEFAULT_SIGNIN_REDIRECT);
    }
  }, [router, verifyEmailState]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Verification code was sent to <strong>{email}</strong>. Check your
          spam folder if you can&apos;t find the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <form ref={codeFormRef} action={verifyEmailAction}>
            <Input
              className="mt-2"
              type="hidden"
              id="email"
              name="email"
              value={email}
            />

            <Label htmlFor="code">Verification code</Label>
            <Input
              className="mt-2"
              type="text"
              id="code"
              name="code"
              required
            />
            <SubmitButton className="mt-4 w-full">Verify</SubmitButton>
          </form>
          <form action={resendAction}>
            <Input
              className="mt-2"
              type="hidden"
              id="email"
              name="email"
              value={email}
            />
            <SubmitButton className="w-full" variant="secondary">
              Resend Code
            </SubmitButton>
          </form>
          <form action={logout}>
            <SubmitButton variant="link" className="p-0 font-normal">
              want to use another email? Log out now.
            </SubmitButton>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
