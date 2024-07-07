import registerSchema from "@/app/(site)/(auth)/register/_schemas/register-schema";
import { z } from "zod";

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterFormInput = z.infer<typeof registerSchema>;

export type RegisterPayload = Omit<RegisterFormInput, "confirmPassword">;
