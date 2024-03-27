import { Schema, model, models } from "mongoose";
const logSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ["IN", "OUT"],
  },
  transactionQuantity: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  stock: { 
    type: Number, 
  }
});

const Log = models.Log || model("Log", logSchema);
export default Log;
