import connectToDatabase from "@/utils/database"
import Log from "@/models/log"
import { NextRequest, NextResponse } from "next/server"

//get -- working
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const logs = await Log.find({});
        return NextResponse.json(logs, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find logs", { status: 500 });
    }
}

//post -- working
export const POST = async (req: NextRequest) => {
    const { material, transactionType, quantity, date, notes, updatedBy } = await req.json();
    try {
        await connectToDatabase();
        const log = await Log.create({ material, transactionType, quantity, date, notes, updatedBy });
        return NextResponse.json(log, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't create log", { status: 500 });
    }
}
