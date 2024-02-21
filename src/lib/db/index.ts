import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import * as userSchema from "@/lib/db/user/schema";

const queryClient = postgres(process.env.DB_URL!);

export const db = drizzle(queryClient, {
  schema: {
    // ...userSchema,
  },
});
