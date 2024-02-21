import type { Config } from "drizzle-kit";
const baseUrl = ".";

export default {
  schema: "src/lib/db/**/schema.ts",
  driver: 'pg',
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true
} satisfies Config;
