import connectToDatabase from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/appointment";
import ExcludedDates from "@/models/excludedDates";
import { getToken } from "next-auth/jwt";
import { eachDayOfInterval, format } from "date-fns";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const appointment = await Appointment.findById(id)
      .populate("servicesId")
      .populate("customerId")
      .populate({
        path: "materialUsed",
        populate: {
          path: "material",
          model: "Material",
        },
      })
      .populate("payments");

    if (!appointment) {
      return NextResponse.json("Appointment not found", { status: 404 });
    }

    if (token.email !== process.env.ADMIN_EMAIL && token.email !== appointment.customerId.email) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

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

     if (appointmentData.paymentTerm === "Partial") {
       appointmentData.payments = [
         { amount: parseFloat((appointmentData.startingBalance * 0.5).toFixed(2)), status: "Unpaid" },
         { amount: parseFloat((appointmentData.startingBalance * 0.25).toFixed(2)), status: "Unpaid" },
         { amount: parseFloat((appointmentData.startingBalance * 0.25).toFixed(2)), status: "Unpaid" },
       ];
     } else {
       appointmentData.payments = [{ amount: parseFloat(appointmentData.startingBalance.toFixed(2)), status: "Unpaid" }];
     }

    if ((appointmentData.status === "Ongoing")) {
      const appointment = await Appointment.findById(id);

      const excludedDates = eachDayOfInterval({
        start: appointment.date,
        end: appointment.endDate,
      }).map((date) => format(date, "yyyy,M,d"));

      await ExcludedDates.create({ dates: excludedDates });

      const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });

      return NextResponse.json(updatedAppointment, { status: 200 });
    }

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
