import connectToDatabase from "@/utils/database";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req: NextRequest) => {
  const categoryData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create category", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const category = await Category.find({});
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};
