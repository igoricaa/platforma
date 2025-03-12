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
    // Read the clean migration file
    const sqlPath = path.join(__dirname, '..', 'drizzle', '0003_better_auth_tables_clean.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL
    console.log('Running clean migration...');
    await pool.query(sql);
    console.log('Migration completed successfully!');
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