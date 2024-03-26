import connectToDatabase from "@/utils/database";
import Materials from "@/models/material";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    // const token = await getToken({ req, secret });

    // if (!token || token.email !== process.env.ADMIN_EMAIL) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    await connectToDatabase();
    const material = await Materials.findById(id).populate("category");
    return NextResponse.json(material, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find material", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const materialData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    // const token = await getToken({ req, secret });

    // if (!token || token.email !== process.env.ADMIN_EMAIL) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    await connectToDatabase();
    const material = await Materials.findByIdAndUpdate(id, materialData, { new: true });
    return NextResponse.json(material, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update material", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    // const token = await getToken({ req, secret });

    // if (!token || token.email !== process.env.ADMIN_EMAIL) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    await connectToDatabase();
    const deletedMaterial = await Materials.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    return NextResponse.json(deletedMaterial, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete material", { status: 500 });
  }
};
