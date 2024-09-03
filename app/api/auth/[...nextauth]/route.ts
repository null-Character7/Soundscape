import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
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
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // If user does not exist, create a new user
          await prisma.user.create({
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
  },
});

export { handler as GET, handler as POST };
