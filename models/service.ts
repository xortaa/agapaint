import { Schema, model, models } from "mongoose";

const ServicesSchema = new Schema({
  // service name
  name: {
    type: String,
    required: true,
    unique: true,
  },

  //service description
  description: {
    type: String,
    required: true,
    unique: true,
  },

  //service image
  image: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Services = models.Services || model("Service", ServicesSchema);
export default Services;
