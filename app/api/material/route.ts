import connectToDatabase from "@/utils/database";
import Materials from "@/models/material";
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
    const material = await Materials.find({}).populate("category");
    return NextResponse.json(material, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find material", { status: 500 });
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
    const materialData = await req.json();
    const newMaterial = new Materials(materialData);
    await newMaterial.save();
    return NextResponse.json(newMaterial, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create material", { status: 500 });
  }
};
