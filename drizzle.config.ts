import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

// Load the test environment file in GitHub Actions
const envFile = process.env.GITHUB_ACTIONS === "true"
  ? ".env.test"
  : process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env.local"

dotenv.config({ path: envFile })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
