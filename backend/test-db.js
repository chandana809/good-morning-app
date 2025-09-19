require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool with retry logic
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'goodmorning_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxRetries: 3
});

// Test database connection
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to PostgreSQL database');
        
        // Test query
        const result = await client.query('SELECT NOW()');
        console.log('Database time:', result.rows[0].now);
        
        client.release();
        return true;
    } catch (err) {
        console.error('Database connection error:', err.message);
        return false;
    } finally {
        // Close the pool
        await pool.end();
    }
}

testConnection()
    .then(success => {
        if (success) {
            console.log('Database connection test completed successfully');
        } else {
            console.log('Database connection test failed');
        }
        process.exit(success ? 0 : 1);
    })
    .catch(err => {
        console.error('Unexpected error:', err);
        process.exit(1);
    });