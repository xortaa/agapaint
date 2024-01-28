import connectToDatabase from "@/utils/database";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

//get
// localhost:3000/api/category/[someething]
// get all
export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const categories = await Category.find({});
    console.log(categories); // log the categories
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  // getting the name from the json { "name": "paint"}
  const { name } = await req.json();
  try {
    await connectToDatabase();
    // initialize what the category looks like following the model
    const newCategory = new Category({ name });
    // saves the category
    const savedCategory = await newCategory.save();
    console.log(savedCategory);
    return NextResponse.json(savedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create category", { status: 500 });
  }
};
