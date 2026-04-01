import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id || token.sub || "";
        token.plan = user.plan || "FREE";
        token.picture = user.image || user.avatar || token.picture;
      }

      token.id = token.id || token.sub || "";
      token.plan = token.plan || "FREE";
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = (token.id as string) || token.sub || "";
        session.user.plan = (token.plan as "FREE" | "PRO" | "TEAM") || "FREE";
        session.user.image = (typeof token.picture === "string" ? token.picture : session.user.image) || null;
      }

      return session;
    }
  }
};
