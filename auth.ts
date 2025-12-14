import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },

    async signIn({ profile }) {
      try {
        const userEmail = profile?.email ?? "";
        const dbUser = await db.query.users.findFirst({
          where: (d, { eq }) => eq(d.email, userEmail),
        });

        if (!dbUser) {
          await db.insert(users).values({
            name: profile?.name ?? "",
            email: profile?.email ?? "",
            image: profile?.picture,
          });
          return true;
        }
        return true;
      } catch (error) {
        console.log("auth-error", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (dbUser?.id) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
          token.isVerified = dbUser.isVerified;
        }
      }

      if (!token.userId && token?.email) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, token.email))
          .limit(1);

        if (dbUser?.id) {
          token.userId = dbUser?.id;
          token.role = dbUser.role;
          token.isVerified = dbUser.isVerified;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
      isVerified: boolean | null;
    } & DefaultSession["user"];
  }
}
