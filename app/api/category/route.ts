import connectToDatabase from "@/utils/database"
import Category from "@/models/category"
import { NextRequest, NextResponse } from "next/server"

//create a category - post
export const POST = async (req: NextRequest) => {
  const { name } = await req.json();
  try {
    await connectToDatabase();
    const category = await Category.create({ name });
    console.log(category); 
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create category", { status: 500 });
  }
}

//get all categories - get
export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const category = await Category.find({});
    console.log(category); 
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};

