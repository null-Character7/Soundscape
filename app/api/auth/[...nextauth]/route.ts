import NextAuth, {type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@/app/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id to the user object in the session
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET ?? "secreat",
  callbacks: {
    async signIn({ user }) {
      try {
        console.log(user)
        // Log the user ID during login
        console.log('User ID during login:', user.id);

        // Check if the user already exists in the database
        if(!user.email){
          return false;
        }
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // If user does not exist, create a new user
          await prismaClient.user.create({
            data: {
              id: user.id,
              email: user.email,
              provider: 'Google', // Set provider based on your needs
            },
          });
        }
        console.log("YAAA")

        // Return true to allow the sign-in, or false to deny it
        return true;
      } catch (error) {
        console.error('Error storing user in the database:', error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session, token }) {
      try {
        // Fetch the user from the database based on their email
        const dbUser = await prismaClient.user.findUnique({
          where: {
            email: session.user?.email as string,
          },
        });
    
        // If the user exists in the database, add their ID to the session
        if (dbUser) {
          return {
            ...session,
            user: {
              ...session.user,
              id: dbUser.id,
            },
          };
        }
    
        // Return the session as is if the user does not exist
        return session;
      } catch (error) {
        console.error('Error fetching user from the database:', error);
        // Return the session as is if there's an error
        return session;
      }
    },
    
  },
});

export { handler as GET, handler as POST };
