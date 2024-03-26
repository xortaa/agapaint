import connectToDatabase from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category";
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
    const category = await Category.findById(id);
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const categoryData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    // const token = await getToken({ req, secret });

    // if (!token || token.email !== process.env.ADMIN_EMAIL) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    await connectToDatabase();
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update category", { status: 500 });
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
    const deletedCategory = await Category.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete category", { status: 500 });
  }
};
