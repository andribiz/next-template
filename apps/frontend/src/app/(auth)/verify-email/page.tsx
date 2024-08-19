import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import { auth } from "@template/auth/auth";
import { redirect } from "next/navigation";
import { VerifyCode } from "./verify-code";

export const metadata = {
  title: "Verify Email",
  description: "Verify Email Page",
};

export default async function VerifyEmailPage() {
  const session = await auth();

  if (session?.user?.emailVerified) redirect(DEFAULT_SIGNIN_REDIRECT);

  return <VerifyCode />;
}
