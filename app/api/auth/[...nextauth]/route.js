import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GAUTHID,
      clientSecret: process.env.GAUTHSECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          console.log("No username or password provided");
          return null;
        }

        try {
          await connectToDB();

          const userExists = await User.findOne({
            username: credentials.username,
          });

          if (!userExists) {
            console.log("User does not exist");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            userExists.password
          );

          if (!passwordsMatch) {
            return null;
          }

          console.log("Authentication successful");
          return userExists;
        } catch (error) {
          console.log("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.username = sessionUser.username;
      session.user.favColor = sessionUser.favColor;

      return session;
    },
    async signIn({ account, profile }) {
      await connectToDB();
      if (account.provider === "google") {
        try {
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      } else {
        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };
