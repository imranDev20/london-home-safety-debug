import forgotPasswordSchema from "@/app/(site)/(auth)/forgot-password/_schemas/forgot-password-schema";
import newPasswordSchema from "@/app/(site)/(auth)/forgot-password/_schemas/new-password-schema";
import loginSchema from "@/app/(site)/(auth)/login/_schemas/login-schema";
import registerSchema from "@/app/(site)/(auth)/register/_schemas/register-schema";
import { z } from "zod";

export type LoginFormInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type NewPasswordPayload = {
  password: string;
  token: string;
};

export type RegisterFormInput = z.infer<typeof registerSchema>;

export type RegisterPayload = Omit<RegisterFormInput, "confirmPassword">;

type TokenType = {
  token: string;
  expiry: Date;
  duration: string;
  type: "reset-password" | "verify-email" | "auth";
  email: string;
  is_verified: boolean;
};
