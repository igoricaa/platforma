import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Function to run migrations
async function runMigrations() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }

  // Create a new connection pool
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  // Create a Drizzle instance
  const db = drizzle(pool);

  // Run migrations
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations completed successfully!');

  // Close the pool
  await pool.end();
}

// Run the migrations
runMigrations()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 