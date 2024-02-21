import connectToDatabase from "@/utils/database";
import Revenue from "@/models/revenue";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const revenues = await Revenue.find().populate("service");
    return NextResponse.json(revenues, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find revenues", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const revenueData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const revenue = await Revenue.create(revenueData);
    return NextResponse.json(revenue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create revenue", { status: 500 });
  }
};
