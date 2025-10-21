import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "./config/db";

async function importBrands() {
  await connectDB();

  const db = mongoose.connection.db;
  if (!db) process.exit(1);

  const filePath = path.resolve("brands.json");
  const data: any[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Convert _id.$oid to real ObjectId safely
  const processed = data.map((doc) => {
    if (doc._id && typeof doc._id === "object" && "$oid" in doc._id) {
      // cast string explicitly to ObjectId
      doc._id = new mongoose.Types.ObjectId(String(doc._id.$oid));
    }
    return doc;
  });

  // Drop collection if exists
  const collections = await db.listCollections({ name: "brands" }).toArray();
  if (collections.length) await db.collection("brands").drop();

  await db.collection("brands").insertMany(processed);

  await mongoose.disconnect();
  process.exit(0);
}

importBrands().catch((err) => {
  console.error(err);
  process.exit(1);
});
