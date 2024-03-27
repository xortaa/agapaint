import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
