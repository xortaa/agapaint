import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // SERVICE NOT ADDED YET
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  requests: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Appointment = model("Appointment", AppointmentSchema);

export default Appointment;
