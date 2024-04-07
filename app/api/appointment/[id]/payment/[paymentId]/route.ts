import connectToDatabase from "@/utils/database";
import Appointment from "@/models/appointment";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string; paymentId: string } }) => {
  const appointmentId = params.id;
  const paymentId = params.paymentId;
  const paymentData = await req.json();
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return NextResponse.json("Can't find appointment", { status: 404 });
    }

    const payment = appointment.payments.id(paymentId);
    if (!payment) {
      return NextResponse.json("Can't find payment", { status: 404 });
    }

    // Check the previous status of the payment
    const previousStatus = payment.status;

    // Update the payment status
    payment.status = paymentData.status;

    // If the status was 'Unpaid' and is now 'Paid', subtract the payment amount from the appointment's current balance
   if (previousStatus === "Unpaid" && paymentData.status === "Paid") {
     appointment.currentBalance = parseFloat((appointment.currentBalance - payment.amount).toFixed(2));
   }

    // If the status was 'Paid' and is now 'Unpaid', add the payment amount to the appointment's current balance
   if (previousStatus === "Paid" && paymentData.status === "Unpaid") {
     appointment.currentBalance = parseFloat((appointment.currentBalance + payment.amount).toFixed(2));
   }

    await appointment.save();

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't update payment", { status: 500 });
  }
};
