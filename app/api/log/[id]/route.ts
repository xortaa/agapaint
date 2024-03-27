import connectToDatabase from "@/utils/database";
import Log from "@/models/log";
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
    const log = await Log.findById(id).populate("material");
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find log", { status: 500 });
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
    const deletedLog = await Log.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    return NextResponse.json(deletedLog, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete log", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const logData = req.json();
  try {
    await connectToDatabase();
    const log = await Log.findByIdAndUpdate(id, logData, { new: true });
    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update log", { status: 500 });
  }
};
