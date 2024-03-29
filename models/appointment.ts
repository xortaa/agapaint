import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  servicesId: {
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
  carType: {
    type: String,
    required: true,
  },
  carManufacturer: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  carColor: {
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
  status: {
    type: String,
    default: "Pending",
  },
  paymentTerm: {
    type: String,
    required: true,
    enum: ["Full", "Partial"],
  },
  startingBalance: {
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);

export default Appointment;
