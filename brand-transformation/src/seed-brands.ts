import { connectDB } from "./config/db";
import { faker } from "@faker-js/faker";
import Brand from "./schemas/brands-schema";
import * as XLSX from "xlsx";


async function seedBrands() {

  const cases = [
    { caseName: "Min Year", yearFounded: 1600 },
    { caseName: "Max Year", yearFounded: new Date().getFullYear() },
    { caseName: "Min Locations", numberOfLocations: 1 },
    { caseName: "Special City", headquarters: "New York" },
    { caseName: "Normal" },
    { caseName: "Normal" },
    { caseName: "Normal" },
    { caseName: "Normal" },
    { caseName: "Normal" },
    { caseName: "Normal" },
  ];


  const createdBrands: any[] = [];

  for (const c of cases) {
    const brand = new Brand({
      brandName: faker.company.name(),
      yearFounded: c.yearFounded ?? faker.number.int({ min: 1600, max: new Date().getFullYear() }),
      numberOfLocations: c.numberOfLocations ?? faker.number.int({ min: 1, max: 10000 }),
      headquarters: c.headquarters ?? faker.location.city(),
    });

    try {
      await brand.validate();
      await brand.save();
      createdBrands.push({
        brandName: brand.brandName,
        yearFounded: brand.yearFounded,
        headquarters: brand.headquarters,
        numberOfLocations: brand.numberOfLocations,
        case: c.caseName,
      });
      console.log(brand.brandName, c.caseName);

    } catch (err) {
      console.error("Failed to seed :", err);
    }
  }

  console.log(`\n Seeding Done.`);
  const worksheet = XLSX.utils.json_to_sheet(createdBrands);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Seeded Brands");
  XLSX.writeFile(workbook, "seeded_brands.xlsx");
  console.log("Excel file 'seeded_brands.xlsx'");
  process.exit(0);
}

connectDB()
  .then(seedBrands)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
