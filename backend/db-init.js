require('dotenv').config();
const { Pool } = require('pg');

// Connect to default postgres database first
const initialPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres', // Connect to default postgres database
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

async function initializeDatabase() {
    try {
        // First, check if database exists
        const checkDb = await initialPool.query(
            "SELECT 1 FROM pg_database WHERE datname = 'goodmorning_db'"
        );

        // If database doesn't exist, create it
        if (checkDb.rowCount === 0) {
            await initialPool.query('CREATE DATABASE goodmorning_db');
            console.log('Database created successfully');
        }
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    } finally {
        await initialPool.end();
    }
}

// Run the initialization
initializeDatabase()
    .then(() => console.log('Database initialization complete'))
    .catch(err => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });