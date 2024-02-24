import connectToDatabase from "@/utils/database";
import Revenue from "@/models/revenue";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });
    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    await connectToDatabase();
    const revenue = await Revenue.findById(id);
    return NextResponse.json(revenue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find revenue", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const revenueData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const revenue = await Revenue.findByIdAndUpdate(id, revenueData, { new: true });
    return NextResponse.json(revenue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update revenue", { status: 500 });
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
    const deletedRevenue = await Revenue.findByIdAndDelete(id);
    return NextResponse.json(deletedRevenue, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete revenue", { status: 500 });
  }
};
