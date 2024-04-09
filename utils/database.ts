import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is must be set in the environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "agapaint",
    });
    isConnected = true;
    console.log("MongoDB is connected");

     require("@/models/appointment");
     require("@/models/category");
     require("@/models/faq");
     require("@/models/log");
     require("@/models/material");
     require("@/models/revenue");
     require("@/models/service");
     require("@/models/user");
     require("@/models/materialUsed");
     require("@/models/excludedDates");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
