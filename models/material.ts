import { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema({
  //fk-category
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: "Uncategorized",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const Material = models.Material || model("Material", MaterialSchema);
export default Material;
