import connectToDatabase from "@/utils/database"
import Log from "@/models/log"
import { NextRequest, NextResponse } from "next/server"

//get--working
export const GET = async (req: NextRequest, {params}:  { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const log = await Log.findById(id);
        console.log(log); // Log the log
        return NextResponse.json(log, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find log", { status: 500 });
    }
}

//delete---working
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const deletedLog = await Log.findByIdAndDelete(id);
        return NextResponse.json(deletedLog, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't delete log", { status: 500 });
    }
}

//update--working
export const PATCH = async (req: NextRequest, { params }: {params: {id: string}}) => {
    const id = params.id;
    const { material, transactionType, quantity, date, notes, updatedBy, isArchived } = await req.json();
    try {
        await connectToDatabase()
        const log = await Log.findByIdAndUpdate(id, { material, transactionType, quantity, date, notes, updatedBy, isArchived}, {new: true})
        return NextResponse.json(log, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("Can't update log", {status: 500})
    }
}