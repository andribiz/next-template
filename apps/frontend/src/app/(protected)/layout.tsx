import { redirect } from "next/navigation";
import type * as React from "react";

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/site";
import { SessionProvider } from "@template/auth";
import { auth } from "@template/auth/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await auth();
  console.log(session);
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
