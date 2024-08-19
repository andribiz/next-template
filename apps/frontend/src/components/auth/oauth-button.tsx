"use client";

import { signIn } from "@template/auth";

import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import { toast } from "@template/ui/lib";

import { Button } from "@template/ui/button";
import { Icons } from "@template/ui/icon";

export function OAuthButtons(): JSX.Element {
  async function handleOAuthSignIn(provider: "google"): Promise<void> {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_SIGNIN_REDIRECT,
      });

      toast.success("You are now signed in");
    } catch (error) {
      toast.error("Please try again");
      console.error(error);
      throw new Error(`Error signing in with ${provider}`);
    }
  }

  return (
    <div className="w-full gap-2 sm:gap-4">
      <Button
        aria-label="Sign in with Google"
        variant="outline"
        onClick={() => void handleOAuthSignIn("google")}
        className="w-full"
      >
        <Icons.google className="mr-2 size-4" />
        Google
      </Button>
    </div>
  );
}
