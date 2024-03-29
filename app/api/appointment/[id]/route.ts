import connectToDatabase from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/appointment";
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
    const appointment = await Appointment.findById(id).populate("servicesId").populate("customerId");
    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find appointment", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const appointmentData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update appointment", { status: 500 });
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
    const deletedAppointment = await Appointment.findByIdAndUpdate(id, { isArchived: true }, { new: true });
    return NextResponse.json(deletedAppointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete appointment", { status: 500 });
  }
};
