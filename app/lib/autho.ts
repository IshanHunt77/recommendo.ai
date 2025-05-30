import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials: any) {
        const userInfo = await prisma.user.findFirst({
          where: { username: credentials.username },
        });

        if (userInfo) {
          return {
            id: userInfo.id.toString(),
            name: userInfo.username,
            username : userInfo.username,
            image : userInfo.profilephoto

          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id || user.sub || "";
        if (user.username) {
          token.username = user.username;
          token.image = user.image;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        if (token.username) {
          session.user.username = token.username;
        }
        if(token.image){
          session.user.image = token.image
        }
        
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
