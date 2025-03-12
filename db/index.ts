import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Create the database instance
export const db = drizzle(pool, { schema });

// Helper function to get the database instance
export function getDb() {
  return db;
} 