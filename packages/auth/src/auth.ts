import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@template/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@template/db/schema";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import {
  getAccountByUserId,
  getUserByEmail,
  getUserById,
  userSetVerified,
} from "./model/auth";
import { LoginSchema } from "./validator";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.error) {
          throw new AuthError("Invalid fields");
        }
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user?.hashedPassword) {
          throw new AuthError("Invalid credentials");
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        if (!passwordsMatch) {
          throw new AuthError("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      if (!user.id) {
        return;
      }
      await userSetVerified(user.id);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        return false;
      }
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.emailVerified = token.emailVerified;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.emailVerified = existingUser.emailVerified;

      return token;
    },
  },
});
