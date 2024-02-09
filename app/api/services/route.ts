import connectToDatabase from "@/utils/database";
import Services from "@/models/services";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const service = await Services.find({});
    console.log(service);
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find service", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const { name, description, image, price } = await req.json();
    const newService = new Services({ name, description, image, price });
    await newService.save();
    return NextResponse.json(newService, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create service", { status: 500 });
  }
};
