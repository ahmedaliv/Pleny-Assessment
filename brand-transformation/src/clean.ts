import fs from "fs";

const files = [
  "brands_transformed.json",
  "brands_export.json",
  "seeded_brands.xlsx"
];

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted ${file}`);
  } else {
    console.log(`${file} not found, skipping`);
  }
}

console.log("File cleanup done!");
