"use server";

import { and, db, eq } from "@template/db";
import {
  accounts,
  passwordResetTokens,
  users,
  verificationTokens,
} from "@template/db/schema";
import { ulid } from "ulidx";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const userSetVerified = async (id: string): Promise<void> => {
  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.id, id));
};

export const userResetPassword = async (
  email: string,
  hashedPassword: string,
) => {
  await db.update(users).set({ hashedPassword }).where(eq(users.email, email));
};

export const getAccountByUserId = async (userId: string) => {
  return await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });
};

export const getVerificationTokenByEmail = async (email: string) => {
  return await db.query.verificationTokens.findFirst({
    where: and(eq(verificationTokens.email, email)),
  });
};

export const getVerificationTokenByToken = async (
  email: string,
  token: string,
) => {
  return await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.token, token),
      eq(verificationTokens.email, email),
    ),
  });
};

export const insertUser = async (
  name: string,
  email: string,
  hashedPassword: string,
) => {
  await db.insert(users).values({
    name,
    email,
    hashedPassword,
  });
};

export const deleteVerificationTokenById = async (id: string) => {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.identifier, id));
};

export const deleteVerificationTokenByEmail = async (email: string) => {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.email, email));
};

export const insertVerificationToken = async (email: string, token: string) => {
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  await db
    .insert(verificationTokens)
    .values({ email, expires, identifier: ulid(), token });
};

export const deletePasswordResetLink = async (email: string) => {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.email, email));
};

export const insertPasswordResetLink = async (email: string, token: string) => {
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  await db.insert(passwordResetTokens).values({ email, expires, token });
};

export const getPasswordResetLink = async (token: string) => {
  return await db.transaction(async (tx) => {
    const item = await tx.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });

    if (item) {
      const hasExpired = new Date(item.expires) < new Date();
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.token, token));
      if (hasExpired) {
        return undefined;
      }
    }
    return item;
  });
};
