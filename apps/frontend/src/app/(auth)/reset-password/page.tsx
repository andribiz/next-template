import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import { auth } from "@template/auth/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@template/ui/card";
import { redirect } from "next/navigation";
import { SendResetEmail } from "./send-reset-email";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
};

export default async function ForgotPasswordPage() {
  const session = await auth();

  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>
          Password reset link will be sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SendResetEmail />
      </CardContent>
    </Card>
  );
}
