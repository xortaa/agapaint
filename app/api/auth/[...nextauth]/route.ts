import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectToDatabase from "@/utils/database";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    // for custom sessions
    // async session({ session, token, user }) {
    //   await connectToDatabase();
    //   const sessionUser = await User.findOne({
    //     email: session.user.email,
    //   });

    //   return session;
    // },
    async signIn({ account, profile }) {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({
          email: profile.email,
        });

        let role: string;
        if (profile.email === process.env.ADMIN_EMAIL) {
          role = "admin";
        }

        if (!userExists) {
          const newUser = new User({
            email: profile.email,
            username: profile.name,
            image: profile.image,
            role,
          });
          await newUser.save();
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
