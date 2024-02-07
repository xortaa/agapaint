import connectToDatabase from "@/utils/database"
import Revenue from "@/models/revenue"
import { NextRequest, NextResponse } from "next/server"

//get--working
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const revenues = await Revenue.find({});
        return NextResponse.json(revenues, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find revenues", { status: 500 });
    }
}

//post--working
export const POST = async (req: NextRequest) => {
    const { service, amount, paymentStatus } = await req.json();
    try {
        await connectToDatabase();
        const revenue = await Revenue.create({ service, amount, paymentStatus });
        return NextResponse.json(revenue, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't create revenue", { status: 500 });
    }
}
