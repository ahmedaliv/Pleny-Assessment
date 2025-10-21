import { connectDB } from "./config/db";
import { faker } from "@faker-js/faker";
import Brand from "./schemas/brands-schema";


function getRandomYear(min: number = 1600): number {
  return faker.number.int({ min, max: new Date().getFullYear() });
}

function getRandomLocations(): number {
  return faker.number.int({ min: 1, max: 10000 });
}

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
      yearFounded: c.yearFounded ?? getRandomYear(),
      headquarters: c.headquarters ?? faker.location.city(),
      numberOfLocations: c.numberOfLocations ?? getRandomLocations(),
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
      console.log(`Seeded brand: ${brand.brandName} (${brand._id}) - Case: ${c.caseName}`);
    } catch (err) {
      console.error("Failed to seed brand:", err);
    }
  }

  console.log(`\n Seeding Done.`);

  process.exit(0);
}

connectDB()
  .then(seedBrands)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
