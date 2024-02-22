import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  service: {
    type: [Schema.Types.ObjectId],
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
    type: String,
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

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);

export default Appointment;
