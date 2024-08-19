import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: " Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  redirectTo: z.string().optional(),
});

export const SignUpSchema = z.object({
  fullName: z.string().min(3, {
    message: " name is required",
  }),
  email: z.string().email({
    message: " Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const VerificationEmailSchema = z.object({
  email: z.string().email({
    message: " Email is required",
  }),
  code: z.string().min(8, {
    message: " name is required",
  }),
});

export const ResetPasswordLinkSchema = z.object({
  email: z.string().email({
    message: " Email is required",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required",
  }),
  token: z.string().min(5, {
    message: "token is required",
  }),
});
