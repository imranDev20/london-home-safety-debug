// types/next-auth.d.ts
import { DefaultUser } from "next-auth";
import { Role } from "./users";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    _id: string;
    role: Role;
    email: string;
    name: string;
    provider: "credentials" | "google";
  }

  interface Session {
    user: DefaultUser & {
      _id: string;
      role: Role;
      provider: "credentials" | "google";
      email: string;
      name: string;
    };
  }
}
