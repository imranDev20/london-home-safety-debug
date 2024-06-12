export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterFormInput = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type RegisterPayload = Omit<RegisterFormInput, "confirmPassword">;
