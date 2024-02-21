import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();
//
// for migrations
const runMigration = async () => {
  console.log("⏳ Running migrations...");
  const migrationClient = postgres(process.env.DB_URL!, { max: 1 });
  const start = Date.now();
  await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
  await migrationClient.end();
  const end = Date.now();
  console.log(`✅ Migrations completed in ${end - start}ms`);
  process.exit(0);
};

runMigration().catch((err) => {
  {
    console.error("❌ Migration failed");
    console.error(err);
    process.exit(1);
  }
});
