import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const authOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // SQLiteではeqを使用して条件を指定
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email),
          });

          if (!user || !user.passwordHash) {
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("認証エラー:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
