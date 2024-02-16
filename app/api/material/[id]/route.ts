import connectToDatabase from "@/utils/database"
import Materials from "@/models/material"
import { NextRequest, NextResponse } from "next/server"

//get - working
export const GET = async (req: NextRequest, {params}:  { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const material = await Materials.findById(id);
        console.log(material); // Log the material
        return NextResponse.json(material, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't find material", { status: 500 });
    }
}

//update - working
export const PATCH = async (req: NextRequest, { params }: {params: {id: string}}) => {
    const id = params.id;
    const { name, quantity, isArchived } = await req.json();
    try {
        await connectToDatabase()
        const material = await Materials.findByIdAndUpdate(id, { name, quantity, isArchived}, {new: true})
        return NextResponse.json(material, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("Can't update material", {status: 500})
    }
}

//delete - working
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;
    try {
        await connectToDatabase();
        const deletedMaterial = await Materials.findByIdAndDelete(id);
        return NextResponse.json(deletedMaterial, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json("Can't delete material", { status: 500 });
    }
}