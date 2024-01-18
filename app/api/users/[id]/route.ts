import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/utils/database"
import { getServerSession, Session } from "next-auth"
import { GET as AuthGET } from "@/app/api/auth/[...nextauth]/route"

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id
  try {
    await connectToDatabase()
    const user = await User.findById(id)
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to get user", { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id
  const session: Session = await getServerSession(AuthGET)
  try {
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }
    await connectToDatabase()
    const user = await User.findByIdAndDelete(id)
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to delete user", { status: 500 })
  }
}

// update example we wont have update for users in this app just an example
export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id
  const { email, username, image, role } = await req.json()
  const session: Session = await getServerSession(AuthGET)
  try {
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }
    await connectToDatabase()
    const user = await User.findByIdAndUpdate(id, { email, username, image, role }, { new: true })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Failed to update user", { status: 500 })
  }
}
