import connectToDatabase from "@/utils/database";
import Services from "@/models/services";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const service = await Services.findById(id);
    console.log(service);
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find service", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const { name, description, image, price } = await req.json();
    const service = await Services.findByIdAndUpdate(id, { name, description, image, price }, { new: true });
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update service", { status: 500 });
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
    const deletedService = await Services.findByIdAndDelete(id);
    return NextResponse.json(deletedService, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete service", { status: 500 });
  }
};
