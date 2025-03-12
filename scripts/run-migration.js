require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { Pool } = require('@neondatabase/serverless');

async function runMigration() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }

  // Create a new connection pool
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    // Get all SQL files in the drizzle directory
    const drizzleDir = path.join(__dirname, '..', 'drizzle');
    const sqlFiles = fs.readdirSync(drizzleDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure migrations run in order

    console.log(`Found ${sqlFiles.length} migration files to run`);

    // Execute each SQL file
    for (const file of sqlFiles) {
      console.log(`Running migration: ${file}`);
      const sqlPath = path.join(drizzleDir, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await pool.query(sql);
      console.log(`Migration ${file} completed successfully!`);
    }

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the migration
runMigration(); 