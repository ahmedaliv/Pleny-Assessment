// src/index.ts
import { connectDB } from "./config/db";
// just a test file to check if the DB connection works

async function main() {
  await connectDB();
  console.log("OK");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});