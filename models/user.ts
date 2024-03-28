import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"],
    default: "customer",
  },
  appointment: {
    type: [Schema.Types.ObjectId],
    ref: "Appointment",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
