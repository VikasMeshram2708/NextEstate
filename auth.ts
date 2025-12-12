import NextAuth from "next-auth";
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
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, profile?.email as string))
          .limit(1);

        if (!dbUser) {
          // register the user
          await db.insert(users).values({
            name: profile?.name as string,
            email: profile?.email as string,
            image: profile?.picture as string,
          });
          return true;
        }
        return false;
      } catch (error) {
        console.log("error", error);
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
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
