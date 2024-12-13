import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.info(
      'Successfully connected to Database'
    );
  } catch (error: any) {
    console.error({
      error: error.message,
      message: `Unable to connect to MongoDB: ${process.env.MONGO_URL?.substring(0, 24)}`,
    });
  }
};
