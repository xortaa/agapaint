import connectToDatabase from "@/utils/database"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase()
    const users = await User.find({})
    // return NextResponse.json("Unauthorized", { status: 401 })
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to get users", { status: 500 })
  }
} 