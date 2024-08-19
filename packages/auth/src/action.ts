"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn, signOut } from "./auth";
import {
  LoginSchema,
  ResetPasswordLinkSchema,
  ResetPasswordSchema,
  SignUpSchema,
  VerificationEmailSchema,
} from "./validator";

import { ulid } from "ulidx";
import {
  deletePasswordResetLink,
  deleteVerificationTokenByEmail,
  deleteVerificationTokenById,
  getPasswordResetLink,
  getUserByEmail,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  insertPasswordResetLink,
  insertUser,
  insertVerificationToken,
  userResetPassword,
  userSetVerified,
} from "./model/auth";
// import { EmailTemplate, sendMail } from "../email";

export const login = async (_: unknown, formData: FormData) => {
  // async (values: z.infer<typeof LoginSchema>) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = LoginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }
  const { email, password, redirectTo } = parsed.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "AccessDenied":
          return { formError: "Invalid email or password!" };
        case "CredentialsSignin":
          return { formError: "Invalid credentials!" };
        default:
          return { formError: "Something went wrong!" };
      }
    }
    throw error;
  }
};

const generateVerificationToken = async (email: string) => {
  await deleteVerificationTokenByEmail(email);
  const code = Array.from(Array(8).keys()).map(() =>
    Math.floor(Math.random() * 10),
  );
  const token = code.join("");
  await insertVerificationToken(email, token);
  return token;
};

const generatePasswordResetToken = async (email: string) => {
  await deletePasswordResetLink(email);
  const code = ulid();
  await insertPasswordResetLink(email, code);
  return code;
};

export const signup = async (_: unknown, formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = SignUpSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password, fullName } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      formError: "Already have an account with this email",
    };
  }
  await insertUser(fullName, email, hashedPassword);

  const verificationToken = await generateVerificationToken(email);
  // await sendMail(email, EmailTemplate.EmailVerification, {
  //   code: verificationToken,
  // });

  return { success: email };
};

export const verifyEmail = async (_: unknown, formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = VerificationEmailSchema.safeParse(obj);
  if (!parsed.success) {
    return {
      error: "invalid parameters",
    };
  }
  const { code, email } = parsed.data;

  const existingToken = await getVerificationTokenByToken(email, code);

  if (!existingToken) {
    console.error("Invalid verification code");
    return {
      error: "Invalid verification code!",
    };
  }
  await deleteVerificationTokenById(existingToken.identifier);

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    console.error("The verification token has expired");
    return {
      error: "The verification token has expired!",
    };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    console.error("Invalid User");
    return {
      error: "Invalid User",
    };
  }

  await userSetVerified(existingUser.id);

  return { success: "Account verified!" };
};

export const resendVerificationEmail = async (
  _: unknown,
  formData: FormData,
) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = ResetPasswordLinkSchema.safeParse(obj);
  if (parsed.error) {
    return {
      error: "Invalid parameters",
    };
  }
  const { email } = parsed.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      error: "Provided email is invalid",
    };
  }
  if (user.emailVerified) {
    return {
      error: "Account already verified",
    };
  }

  const item = await getVerificationTokenByEmail(email);
  if (item) {
    if (item.expires > new Date()) {
      return {
        error: "Please wait 5 minutes before resending the verification email",
      };
    }
  }

  const verificationToken = await generateVerificationToken(email);
  // await sendMail(email, EmailTemplate.EmailVerification, {
  //   code: verificationToken,
  // });
  return { success: true };
};

export const sendPasswordResetLink = async (_: unknown, formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = ResetPasswordLinkSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.email?.[0],
    };
  }
  const { email } = parsed.data;
  const user = await getUserByEmail(email);

  if (!user?.emailVerified) {
    return {
      error: "Provided email is invalid",
    };
  }
  const verificationToken = await generatePasswordResetToken(user.id);

  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

  // await sendMail(user.email, EmailTemplate.PasswordReset, {
  //   link: verificationLink,
  // });
  return { success: true };
};

export const resetPassword = async (_: unknown, formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());

  const parsed = ResetPasswordSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.token?.[0] ?? err.fieldErrors.password?.[0],
    };
  }
  const { password, token } = parsed.data;
  const resetLink = await getPasswordResetLink(token);
  if (!resetLink?.email) {
    return {
      error: "Invalid reset token",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userResetPassword(resetLink.email, hashedPassword);
  return { success: true };
};

export const logout = async () => {
  await signOut();
};
