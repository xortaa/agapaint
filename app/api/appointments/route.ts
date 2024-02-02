import connectToDatabase from "@/utils/database"
import Appointments from "@/models/appointment"
import { NextRequest, NextResponse } from "next/server"

//create an appointment - post
export const POST = async (req: NextRequest) => {
  const { customer, service, firstName, lastName, email, phoneNumber, plateNumber, carModel, requests, date, time } = await req.json();
  try {
    await connectToDatabase();
    const appointment = await Appointments.create({ customer, service, firstName, lastName, email, phoneNumber, plateNumber, carModel, requests, date, time });
    console.log(appointment); 
    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create appointment", { status: 500 });
  }
}

// get all appointments - get
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const appointment = await Appointments.find({});
        console.log(appointment); 
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find appointment", { status: 500 });
    }
    }