import connectToDatabase from "@/utils/database";
import Log from "@/models/log";
import Material from "@/models/material";
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
    const logs = await Log.find({}).populate("material");
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

    let update: any;
    if (logData.transactionType === "IN") {
      update = { $inc: { quantity: logData.transactionQuantity } };
    } else if (logData.transactionType === "OUT") {
      update = { $inc: { quantity: - logData.transactionQuantity } };
    }

    const material = await Material.findByIdAndUpdate(logData.material, update, { new: true });
    if (!material) {
      return NextResponse.json("Material not found", { status: 404 });
    }

    const log = await Log.create(logData);

    return NextResponse.json(log, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create log", { status: 500 });
  }
};
