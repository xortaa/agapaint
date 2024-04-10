import connectToDatabase from "@/utils/database";
import Appointment from "@/models/appointment";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { customAlphabet } from "nanoid";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  const appointmentData = await req.json();
  const { recaptchaResponse } = appointmentData;
  try {
    await connectToDatabase();

    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaResponse,
      },
    });

    if (response.data.success) {
      if (appointmentData.paymentTerm === "Partial") {
        appointmentData.payments = [
          { amount: parseFloat((appointmentData.totalPrice * 0.5).toFixed(2)), status: "Unpaid" },
          { amount: parseFloat((appointmentData.totalPrice * 0.25).toFixed(2)), status: "Unpaid" },
          { amount: parseFloat((appointmentData.totalPrice * 0.25).toFixed(2)), status: "Unpaid" },
        ];
      } else {
        appointmentData.payments = [{ amount: parseFloat(appointmentData.totalPrice.toFixed(2)), status: "Unpaid" }];
      }

      const nanoid = customAlphabet("1234567890", 5);
      appointmentData.nanoid = nanoid();

      const appointment = await Appointment.create(appointmentData);

      const customer = await User.findById(appointment.customerId);

      customer.appointment.push(appointment._id);

      await customer.save();

      return NextResponse.json(appointment, { status: 200 });
    } else {
      return NextResponse.json("Recaptcha failed", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create appointment", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const secret = process.env.JWT_SECRET;
  try {
    const token = await getToken({ req, secret });

    if (!token || token.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const appointment = await Appointment.find({})
      .populate("customerId")
      .populate("servicesId")
      .populate({ path: "materialUsed", populate: { path: "material", model: "Material" } })
      .populate("payments");

    console.log(appointment);
    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find appointment", { status: 500 });
  }
};
