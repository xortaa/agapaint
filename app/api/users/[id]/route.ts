import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/database";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;

  try {
    const token = await getToken({ req, secret });

    await connectToDatabase();
    const user = await User.findById(id).populate({
      path: "appointment",
      populate: {
        path: "servicesId",
      },
    });

    if (token.email === process.env.ADMIN_EMAIL || token.email === user.email) {
      return NextResponse.json(user, { status: 200 });
    }
    
    return NextResponse.json("Unauthorized", { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to get user", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to delete user", { status: 500 });
  }
};
