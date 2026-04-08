import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("No database connected")
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quill_fire_db",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error instanceof Error ? error.message: error);
  }
};
