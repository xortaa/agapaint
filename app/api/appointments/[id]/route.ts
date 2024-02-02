import connectToDatabase from "@/utils/database"
import Appointments from "@/models/appointment"
import { NextRequest, NextResponse } from "next/server"
import { AlertHeading } from "react-bootstrap";
import Head from "next/head";

//get appointments per ID - get
export const GET = async (req: NextRequest, {params}: {params:{id: string}}) => {
    const id  = params.id;
    try {
        await connectToDatabase();
        const appointment = await Appointments.findById(id);
        console.log(appointment); 
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find appointment", { status: 500 });
    }
};

//patch appointments per ID - patch
export const PATCH = async (req: NextRequest, {params}: {params:{id: string}}) => {
    const id  = params.id;
    const { customer, service, firstName, lastName, email, phoneNumber, plateNumber, carModel, requests, date, time } = await req.json();
    try {
        await connectToDatabase();
        const updatedAppointment = await Appointments.findByIdAndUpdate(id, { customer, service, firstName, lastName, email, phoneNumber, plateNumber, carModel, requests, date, time }, { new: true });
        return NextResponse.json(updatedAppointment, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't update appointment", { status: 500 });
    }
};

//delete appointments per ID - delete
export const DELETE = async (req: NextRequest, {params}: {params:{id: string}}) => {
    const id  = params.id;
    try {
        await connectToDatabase();
        const deletedAppointment = await Appointments.findByIdAndDelete(id);
        return NextResponse.json(deletedAppointment, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't delete appointment", { status: 500 });
    }
}
