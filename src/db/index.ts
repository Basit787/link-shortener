import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "";

if (!MONGO_URI) {
  throw new Error("❌ Please add your Mongo URI to .env");
}

// Extend NodeJS global type to include mongoose caching
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global._mongoose;

if (!cached) {
  global._mongoose = { conn: null, promise: null };
  cached = global._mongoose;
}

export default async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn; // Reuse existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
