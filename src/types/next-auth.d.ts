// types/next-auth.d.ts
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  // interface Session {
  //   user?: DefaultUser & {
  //     id: string;
  //   };
  // }

  interface User extends DefaultUser {
    id?: string;
    _id: string;
  }
}
