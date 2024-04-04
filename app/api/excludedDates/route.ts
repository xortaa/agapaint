import connectToDatabase from "@/utils/database";
import ExcludedDates from "@/models/excludedDates";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const excludedDates = await ExcludedDates.find({});
    return NextResponse.json(excludedDates, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't get excluded dates", { status: 500 });
  }
};
