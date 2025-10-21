import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/brands-db";

export async function connectDB() {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connected to MongoDB:", MONGO_URI);
}
