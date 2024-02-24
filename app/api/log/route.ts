import connectToDatabase from "@/utils/database";
import Log from "@/models/log";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const logs = await Log.find({});
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find logs", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const logData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const log = await Log.create(logData);
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create log", { status: 500 });
  }
};
