import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schemas from "./schema";

export * from "drizzle-orm/sql";

export * from "drizzle-orm/sql";

export const schema = {
  ...schemas,
};

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }
//
// const connectionString = process.env.DATABASE_URL;
// const psClient = postgres(connectionString, { prepare: false });
// export const db = drizzle(psClient, { schema });

export const createDB = (connectionString: string) => {
  return drizzle(postgres(connectionString, { prepare: false }), { schema });
};

export type DbType = ReturnType<typeof createDB>;

// export const runMigration = async (uri: string, urlOverride?: URL) => {
//   const migrationClient = postgres(uri, { max: 1 });
//   await migrate(drizzle(migrationClient), {
//     migrationsFolder: (urlOverride ?? new URL("../migrations", import.meta.url))
//       .pathname,
//   });
//   await migrationClient.end();
// };
//

export const db = createDB(process.env.DATABASE_URL ?? "");
