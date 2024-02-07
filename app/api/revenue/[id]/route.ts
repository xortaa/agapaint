import connectToDatabase from "@/utils/database"
import Revenue from "@/models/revenue"
import { NextRequest, NextResponse } from "next/server"

//get-working
export const GET = async (req: NextRequest, {params}:  { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const revenue = await Revenue.findById(id);
        console.log(revenue); // Log the revenue
        return NextResponse.json(revenue, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find revenue", { status: 500 });
    }
}

//patch--working
export const PATCH = async (req: NextRequest, { params }: {params: {id: string}}) => {
    const id = params.id;
    const { service, amount, paymentStatus } = await req.json();
    try {
        await connectToDatabase()
        const revenue = await Revenue.findByIdAndUpdate(id, { service, amount, paymentStatus}, {new: true})
        return NextResponse.json(revenue, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("Can't update revenue", {status: 500})
    }
}

//delete--working
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const deletedRevenue = await Revenue.findByIdAndDelete(id);
        return NextResponse.json(deletedRevenue, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't delete revenue", { status: 500 });
    }
}