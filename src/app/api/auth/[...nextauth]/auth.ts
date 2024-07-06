import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../_lib/dbConnect";
import bcrypt from "bcrypt";
import User from "../../_models/User";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("No user found with the email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
          role: user.role,
          provider: user.provider,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile;

        await dbConnect();
        const existingUser = await User.findOne({ email: profile?.email });

        if (!existingUser) {
          const newUser = new User({
            name: googleProfile?.name,
            email: googleProfile?.email,
            image: googleProfile?.picture,
            provider: account.provider,
            creation_method: "google",
          });

          await newUser.save();
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          _id: token._id,
          role: token.role,
          provider: token.provider,
        },
      };
    },

    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        token.name = session.name;
      } else {
        if (token.email) {
          const user = await User.findOne({ email: token.email });

          token.name = user?.name;
          token._id = user?._id;
          token.role = user?.role;
          token.provider = user?.provider;
        }
      }

      return token;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
