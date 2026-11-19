import { config } from "dotenv";
config();

const devUrl = process.env["DATABASE_URL"] ?? "";
const testUrl = process.env["DATABASE_URL_TEST"] ?? "";

if (!testUrl || testUrl.trim() === "") {
  throw new Error(
    "ABORT: DATABASE_URL_TEST is missing. Tests must run against DATABASE_URL_TEST only."
  );
}

if (testUrl === devUrl) {
  throw new Error(
    "ABORT: DATABASE_URL_TEST equals DATABASE_URL. Aborting to protect dev database."
  );
}

// Direct all database operations in tests to the test database branch
process.env["DATABASE_URL"] = testUrl;
