import connectToDatabase from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category";

// GET -working
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const category = await Category.findById(id);
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find category", { status: 500 });
  }
};

// PATCH - working
export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const { name } = await req.json();
  try {
    await connectToDatabase();
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update category", { status: 500 });
  }
};

// DELETE - working
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const deletedCategory = await Category.findByIdAndDelete(id);
    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete category", { status: 500 });
  }
};



