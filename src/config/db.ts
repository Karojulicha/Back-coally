import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async (): Promise<void> => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.log(err);
  }
};
