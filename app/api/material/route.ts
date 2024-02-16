import connectToDatabase from "@/utils/database"
import Materials from "@/models/material"
import { NextRequest, NextResponse } from "next/server"

//get - working
export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const material = await Materials.find({});
        console.log(material); // Log the material
        return NextResponse.json(material, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find material", { status: 500 });
    }
}

//post- working
export const POST = async (req: NextRequest) => { 
    try {
        await connectToDatabase();
        const { category, name, quantity, isArchived } = await req.json();
        const newMaterial = new Materials({ category, name, quantity, isArchived});
        await newMaterial.save();
        return NextResponse.json(newMaterial, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't create material", { status: 500 });
    }
}