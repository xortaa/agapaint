import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
    // service name
    name:{
        type: String,
        required: true,
        unique: true,
    },

    //service description
    description:{
        type: String,
        required: true,
        unique: true,
    },

    //service image
    image:{
        type: String,
    },

    price:{
        type: Number,
        required: true,
        default: 0,
    },
});

ServiceSchema.discriminator("Service", ServiceSchema);
const Service = models.Service || model("Service", ServiceSchema);
export default Service;