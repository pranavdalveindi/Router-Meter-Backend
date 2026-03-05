import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const client = postgres(connectionString, { max: 1 }); // single connection for server
// export const db = drizzle(client, { schema });

// Optional: for serverless/edge you could use connection pooling or http driver
// but for classic Node/Express → this is fine