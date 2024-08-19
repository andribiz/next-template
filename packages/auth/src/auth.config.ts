import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  session: { strategy: "jwt" },
  pages: {
    signIn: process.env.DEFAULT_UNAUTHENTICATED_REDIRECT,
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

  ],
} satisfies NextAuthConfig;
