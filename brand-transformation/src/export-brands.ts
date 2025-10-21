import { connectDB } from "./config/db";
import Brand from "./schemas/brands-schema";
import fs from "fs";

async function exportBrands() {
  await connectDB();

  // lean() to get plain JS objects instead of mong. docs
  const brands = await Brand.find().lean(); 

  fs.writeFileSync("brands_transformed.json", JSON.stringify(brands, null, 2));
  console.log("Exporting Done");

  process.exit(0);
}

exportBrands().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
