import connectToDatabase from "@/utils/database";
import Appointment from "@/models/appointment";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const appointmentData = await req.json();

  const secret = process.env.JWT_SECRET;

  const token = await getToken({ req, secret });

  if (!token || token.email !== appointmentData.email) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    await connectToDatabase();

    if (appointmentData.paymentTerm === "Partial") {
      appointmentData.payments = [
        { amount: appointmentData.totalCost * 0.5, status: "Unpaid" },
        { amount: appointmentData.totalCost * 0.25, status: "Unpaid" },
        { amount: appointmentData.totalCost * 0.25, status: "Unpaid" },
      ];
    } else {
      appointmentData.payments = [{ amount: appointmentData.totalCost, status: "Unpaid" }];
    }

    const appointment = await Appointment.create(appointmentData);

    const customer = await User.findById(appointment.customerId);

    customer.appointment.push(appointment._id);

    await customer.save();

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create appointment", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const appointmentId = params.id;
  const updatedData = await req.json();
  const secret = process.env.JWT_SECRET;
  const token = await getToken({ req, secret });

  // if (!token || token.email !== process.env.ADMIN_EMAIL) {
  //   return NextResponse.json("Unauthorized", { status: 401 });
  // }

  try {
    await connectToDatabase();
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return NextResponse.json("Can't find appointment", { status: 404 });
    }

    // If the startingBalance is updated, update the payment amounts
    if (updatedData.startingBalance !== undefined) {
      appointment.startingBalance = updatedData.startingBalance;

      if (appointment.paymentTerm === "Partial") {
        appointment.payments[0].amount = appointment.startingBalance * 0.5;
        appointment.payments[1].amount = appointment.startingBalance * 0.25;
        appointment.payments[2].amount = appointment.startingBalance * 0.25;
      } else {
        appointment.payments.forEach((payment) => {
          payment.amount = appointment.startingBalance;
        });
      }
    }

    await appointment.save();

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update payment", { status: 500 });
  }
};
