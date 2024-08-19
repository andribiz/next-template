"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { resetPassword } from "@template/auth/action";
import { TriangleAlertIcon } from "@template/ui/icon";
import { Label } from "@template/ui/label";
import { toast } from "@template/ui/lib";
import { PasswordInput } from "@template/ui/password-input";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function ResetPassword({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPassword, null);

  useEffect(() => {
    if (state?.error) {
      toast(state.error, {
        icon: <TriangleAlertIcon className="h-5 w-5 text-destructive" />,
      });
    }
  }, [state?.error]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label>New Password</Label>
        <PasswordInput
          name="password"
          required
          autoComplete="new-password"
          placeholder="********"
        />
      </div>
      <SubmitButton className="w-full">Reset Password</SubmitButton>
    </form>
  );
}
