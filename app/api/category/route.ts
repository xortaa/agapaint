import connectToDatabase from "@/utils/database"
import Category from "@/models/category"
import { NextRequest, NextResponse } from "next/server"

//get
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const category = await Category.findById(id);
    console.log(category); // log the category
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};

