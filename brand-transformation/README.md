# Brand Transformation
This project demonstrates how to transform brand data stored in a MongoDB database using Node.js and Mongoose. It includes scripts to import, transform, seed, and export brand data.

## Prerequisites
- Node.js
- MongoDB
- pnpm (or npm/yarn)

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
    ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

4. Add the brand data JSON file (`brands.json`) in the root directory.

5. Run the complete process:
   ```bash
   pnpm run run-all
   ```
    This will clean the database, import the brand data, transform it, seed the database with transformed data, and finally export the transformed data to `brands_transformed.json` and also create an excel file `brands_transformed.xlsx`. 

## Scripts
- `pnpm run clean`: Cleans the directory by removing generated files.

- `pnpm run import`: Clears the database and imports brand data from `brands.json` into MongoDB.

- `pnpm run transform`: Transforms the brand data in the database to comply with the new schema requirements.

- `pnpm run seed`: Seeds the database with the transformed brand data and generates an Excel file.

- `pnpm run export`: Exports the transformed brand data from MongoDB to `brands_transformed.json`.

- `pnpm run run-all`: Executes all the above scripts in sequence.


## Project Structure
- `src/config/db.ts`: Database connection configuration.
- `src/models/Brand.ts`: Mongoose schema and model for Brand.
- `src/import-brands.ts`: Script to import brand data.
- `src/transform-brands.ts`: Script to transform brand data.
- `src/seed-brands.ts`: Script to seed the database with transformed data.
- `src/export-brands.ts`: Script to export transformed brand data.
- `brands.json`: Sample brand data to be imported.





