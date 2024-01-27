import User from "@/models/user";
import connectToDatabase from "@/utils/database";

export async function getUsers() {
  await connectToDatabase();
  const users = await User.find({});
  return users;
}
