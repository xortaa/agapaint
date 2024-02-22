import { Schema, model, models } from "mongoose";
const revenueSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
    required: true,
  },
});

const Revenue = models.Revenue || model("Revenue", revenueSchema);
export default Revenue;
