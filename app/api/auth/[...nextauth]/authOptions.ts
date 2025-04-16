import { prisma } from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Always allow sign in to proceed
    },
    
    // Use the session callback instead, which runs after the user is created
    async session({ session, user, token }) {
      if (session?.user?.email) {
        // Check if this is a Google or GitHub user and update emailVerified
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { emailVerified: true, id: true, accounts: { select: { provider: true } } }
        });
        
        if (user && !user.emailVerified && 
            user.accounts?.some(acc => ['google', 'github'].includes(acc.provider))) {
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
          });
        }
      }
      return session;
    }
  }
};

export default authOptions;



