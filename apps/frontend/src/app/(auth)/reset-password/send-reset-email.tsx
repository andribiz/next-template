"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { DEFAULT_SIGNUP_REDIRECT } from "@/config/site";
import { sendPasswordResetLink } from "@template/auth/action";
import { Button } from "@template/ui/button";
import { Input } from "@template/ui/input";
import { Label } from "@template/ui/label";
import { toast } from "@template/ui/lib";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function SendResetEmail() {
  const [state, formAction] = useFormState(sendPasswordResetLink, null);

  useEffect(() => {
    if (state?.success) {
      toast("A password reset link has been sent to your email.");
    }
  }, [state?.success]);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label>Your Email</Label>
        <Input
          required
          placeholder="email@example.com"
          autoComplete="email"
          name="email"
          type="email"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Link href={DEFAULT_SIGNUP_REDIRECT}>
          <Button variant={"link"} size={"sm"} className="p-0">
            Not signed up? Sign up now
          </Button>
        </Link>
      </div>
      {state?.error && (
        <p className="rounded-lg border bg-destructive/10 p-2 font-medium text-[0.8rem] text-destructive">
          {state?.error}
        </p>
      )}

      <SubmitButton className="w-full">Reset Password</SubmitButton>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/">Cancel</Link>
      </Button>
    </form>
  );
}
