import connectToDatabase from "@/utils/database";
import Faq from "@/models/faq";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;

  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const faq = await Faq.findById(id);
    if (!faq) {
      return NextResponse.json("Faq not found", { status: 404 });
    }
    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to get faq", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const faqData = await req.json();
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const updatedFaq = await Faq.findByIdAndUpdate(id, faqData, { new: true });
    if (!updatedFaq) {
      return NextResponse.json("Faq not found", { status: 404 });
    }
    return NextResponse.json(updatedFaq, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to update faq", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return NextResponse.json("Faq not found", { status: 404 });
    }
    return NextResponse.json(deletedFaq, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to delete faq", { status: 500 });
  }
};
