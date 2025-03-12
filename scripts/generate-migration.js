const fs = require('fs');
const path = require('path');

function generateMigration() {
  try {
    // Get all SQL files in the drizzle directory
    const drizzleDir = path.join(__dirname, '..', 'drizzle');
    const sqlFiles = fs.readdirSync(drizzleDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure migrations run in order

    console.log(`Found ${sqlFiles.length} migration files to combine`);

    // Combine all SQL files into one
    let combinedSql = '';
    for (const file of sqlFiles) {
      console.log(`Adding migration: ${file}`);
      const sqlPath = path.join(drizzleDir, file);
      const sql = fs.readFileSync(sqlPath, 'utf8');
      combinedSql += `-- Migration: ${file}\n${sql}\n\n`;
    }

    // Write the combined SQL to a file
    const outputPath = path.join(__dirname, '..', 'combined-migration.sql');
    fs.writeFileSync(outputPath, combinedSql);
    console.log(`Combined migration written to: ${outputPath}`);
    console.log('Please run this SQL in your database management tool.');
  } catch (error) {
    console.error('Failed to generate migration:', error);
    process.exit(1);
  }
}

// Generate the migration
generateMigration(); 