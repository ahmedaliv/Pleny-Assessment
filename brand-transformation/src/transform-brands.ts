// src/transform-brands.ts
import Brand from "./schemas/brands-schema";
import { connectDB } from "./config/db";


function parseNumber(value: any): number | undefined {
    // try to parse depending on type
    if (typeof value === "number" && !isNaN(value)) return value;
    if (typeof value === "string") {
        const num = parseInt(value);
        return isNaN(num) ? undefined : num;
    }
    return undefined;
}

async function transformBrands() {
    const brands = await Brand.find({});
    const MIN_YEAR = 1600;
    const MAX_YEAR = new Date().getFullYear();
    const MIN_LOCATIONS = 1;
    for (const brand of brands as any[]) {
        // transform to plain object to access legacy fields easily
        const raw = brand.toObject();
        const update: any = {};
        // always unset legacy fields
        const unset: any = {
            brand: "",
            yearCreated: "",
            yearsFounded: "",
            hqAddress: "",
        };

        // --- brandName ---
        if (raw.brand && typeof raw.brand === "object" && raw.brand?.name) {
            update.brandName = raw.brand.name;
        }
        // --- yearFounded ---
        // shows in yearCreated as a string or a number and in yearFounded as a string or as a number and also in yearsFounded ()
        let yearFounded = parseNumber(raw.yearFounded) ?? parseNumber(raw.yearCreated) ?? parseNumber(raw.yearsFounded);
        if (yearFounded !== undefined) {
            if (yearFounded < MIN_YEAR) yearFounded = MIN_YEAR;
            if (yearFounded > MAX_YEAR) yearFounded = MAX_YEAR;
            update.yearFounded = yearFounded;
        } else {
            // invalid || missing -> set to MIN_YEAR
            update.yearFounded = MIN_YEAR;
        }
        // shows as hqAddress or headquarters
        // --- headquarters ---
        if (raw.hqAddress && typeof raw.hqAddress === "string" && raw.hqAddress.trim() !== "") {
            update.headquarters = raw.hqAddress.trim();
        }

        // --- numberOfLocations ---
        let numberOfLocations = parseNumber(raw.numberOfLocations);
        if (numberOfLocations !== undefined) {
            if (numberOfLocations < MIN_LOCATIONS) numberOfLocations = MIN_LOCATIONS;
            update.numberOfLocations = numberOfLocations;
        } else {
            // invalid || missing -> set to MIN_LOCATIONS
            update.numberOfLocations = MIN_LOCATIONS;
        }

        await Brand.updateOne(
            { _id: brand._id },
            { $set: update, $unset: unset },
            { strict: false }
        );
    }
    // console.log("Transformation Done.");
    // mongoose.disconnect();
    process.exit(0);

}



connectDB()
    .then(transformBrands)
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
