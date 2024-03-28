import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectToDatabase from "@/utils/database";
import { DefaultSession, DefaultUser } from "next-auth";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

declare module "next-auth" {
  export interface Session {
    user: {
      _id: string;
      role: string;
    } & DefaultSession["user"];
  }

  export interface User extends DefaultUser {
    _id: string;
    role: string;
  }
}

const handler: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true",
        },
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      return new Promise((resolve, reject) => {
        User.findOne({ email: session.user.email })
          .then((sessionUser) => {
            if (sessionUser && sessionUser._id && sessionUser.role) {
              session.user = {
                ...session.user,
                _id: sessionUser._id.toString(),
                role: sessionUser.role,
              };
              resolve(session);
            } else {
              resolve(null);
            }
          })
          .catch(reject);
      });
    },
    async signIn({ account, profile, user }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({
          email: profile.email,
        });

        console.log("User exists:", userExists);

        let role: string;
        if (profile.email === process.env.ADMIN_EMAIL) {
          role = "admin";
        }

        if (!userExists) {
          console.log("Creating a new user...");

          const newUser = new User({
            email: profile.email,
            username: profile.name,
            image: profile.image,
            role,
          });
          await newUser.save();

          user._id = newUser._id.toString();
        } else {
          user._id = userExists._id.toString();
          user.role = userExists.role;
        }

        console.log("Sign-in process completed successfully.");

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
