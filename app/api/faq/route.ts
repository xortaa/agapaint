import connectToDatabase from "@/utils/database";
import Faq from "@/models/faq";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    await connectToDatabase();
    const faqs = await Faq.find({});
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to get faqs", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const faqData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const newFaq = new Faq(faqData);
    await newFaq.save();
    return NextResponse.json(newFaq, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to create faq", { status: 500 });
  }
};
