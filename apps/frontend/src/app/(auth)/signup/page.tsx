import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import { auth } from "@template/auth/auth";
import { redirect } from "next/navigation";
import { Signup } from "./signup";

export const metadata = {
  title: "Sign Up",
  description: "Signup Page",
};

export default async function SignupPage() {
  const session = await auth();

  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return <Signup />;
}
