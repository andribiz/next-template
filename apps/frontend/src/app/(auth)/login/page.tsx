import { DEFAULT_SIGNIN_REDIRECT } from "@/config/site";
import { auth } from "@template/auth/auth";
import { redirect } from "next/navigation";
import { Login } from "./login";

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  const session = await auth();

  if (session) redirect(DEFAULT_SIGNIN_REDIRECT);

  return <Login />;
}
