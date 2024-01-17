import { Schema, model, models } from "mongoose"

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
})

// if customer then add these fields
const CustomerSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  appointments: { 
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  }
})
UserSchema.discriminator("Customer", CustomerSchema)

const User = models.User || model("User", UserSchema)

export default User

