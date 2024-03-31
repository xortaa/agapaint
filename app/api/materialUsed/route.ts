import connectToDatabase from "@/utils/database";
import MaterialUsed from "@/models/materialUsed";
import Appointment from "@/models/appointment";
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
    const materialUsed = await MaterialUsed.find({});
    // const material = await Materials.find({}).populate("category");
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    await connectToDatabase();
    const materialUsedData = await req.json();

    const existingMaterialUsed = await MaterialUsed.findOne({
      appointment: materialUsedData.appointment,
      material: materialUsedData.material,
    });

    if (existingMaterialUsed) {
      existingMaterialUsed.quantity = Number(existingMaterialUsed.quantity) + Number(materialUsedData.quantity);
      await existingMaterialUsed.save();
      const populatedExistingMaterialUsed = await MaterialUsed.findById(existingMaterialUsed._id).populate('material');
      return NextResponse.json(populatedExistingMaterialUsed, { status: 200 });
    }

    const newMaterialUsed = new MaterialUsed(materialUsedData);
    await newMaterialUsed.save();
    const populatedNewMaterialUsed = await MaterialUsed.findById(newMaterialUsed._id).populate('material');

    const appointment = await Appointment.findById(materialUsedData.appointment);

    if (!appointment.materialUsed) {
      appointment.materialUsed = [];
    }

    appointment.materialUsed.push(newMaterialUsed._id);
    await appointment.save();

    return NextResponse.json(populatedNewMaterialUsed, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Request Failed", { status: 500 });
  }
};