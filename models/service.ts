import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  carType: {
    type: String,
  },
});

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
