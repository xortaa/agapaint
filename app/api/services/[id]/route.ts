import connectToDatabase from "@/utils/database";
import Services from "@/models/services";
import { NextRequest, NextResponse } from "next/server";
//gets each service based on id

//get - working

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const service = await Services.findById(id);
    console.log(service); // log the service
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't find service", { status: 500 });
  }
};

//update - working
export const PATCH = async (req: NextRequest, { params }: {params: {id: string}}) => {
    const id = params.id;
    const { name, description, image, price } = await req.json();
    try {
        await connectToDatabase()
        const service = await Services.findByIdAndUpdate(id, {name, description, image, price}, {new: true})
        return NextResponse.json(service, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("Can't update service", {status: 500})
    }
    }

//post
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { name, description, image, price } = await req.json();
  try {
    await connectToDatabase();
    const service = await Services.create({ name, description, image, price });
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't create service", { status: 500 });
  }
};

//delete - working
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;
  try {
    await connectToDatabase();
    const deletedService = await Services.findByIdAndDelete(id);
    return NextResponse.json(deletedService, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Can't delete service", { status: 500 });
  }
};
