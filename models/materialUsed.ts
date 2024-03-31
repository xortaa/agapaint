import { Schema, model, models } from "mongoose";

const materialUsedSchema = new Schema({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  material: {
    type: Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const MaterialUsed = models.MaterialUsed || model("MaterialUsed", materialUsedSchema);

export default MaterialUsed;
