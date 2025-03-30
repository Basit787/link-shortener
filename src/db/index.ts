import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export default async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    throw new Error("MongoDB Connection Error:", error as Error);
  }
}
