// src/index.ts
import { connectDB } from "./config/db";

async function main() {
  await connectDB();
  console.log("OK");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});