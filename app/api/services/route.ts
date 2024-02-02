import connectToDatabase from "@/utils/database"
import Services from "@/models/services"
import { NextRequest, NextResponse } from "next/server"

//getting the services - working
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const service = await Services.find({});
        console.log(service); // Log the service
        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find service", { status: 500 });
    }
}

//creating a service - working
export const POST = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const { name, description, image, price } = await req.json();
        const newService = new Services({ name, description, image, price});
        await newService.save();
        return NextResponse.json(newService, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't create service", { status: 500 });
    }
}



