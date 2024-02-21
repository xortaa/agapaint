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
    async signIn({ account, profile }) {
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

          console.log("User created:", newUser);
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
