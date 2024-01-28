import connectToDatabase from "@/utils/database";
import Faq from "@/models/faq"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try { 
    await connectToDatabase();
    const faqs = await Faq.find({});
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) { 
    console.log(error)
    return NextResponse.json("Failed to get faqs", { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  const {question, answer} = await req.json()
  try {
    await connectToDatabase();
    const newFaq = new Faq({question, answer});
    const savedFaq = await newFaq.save();
    return NextResponse.json(savedFaq, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to create faq", { status: 500 });
  }
}