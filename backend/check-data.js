require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'goodmorning_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
});

async function checkDatabase() {
    try {
        // Test the connection
        console.log('Testing database connection...');
        const client = await pool.connect();
        
        // Check if table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name = 'user_submissions'
            );
        `);
        
        console.log('Table exists:', tableCheck.rows[0].exists);
        
        // Count records
        const countResult = await client.query('SELECT COUNT(*) FROM user_submissions');
        console.log('Number of records:', countResult.rows[0].count);
        
        // Get all records
        const allRecords = await client.query('SELECT * FROM user_submissions');
        console.log('All records:', allRecords.rows);
        
        client.release();
    } catch (err) {
        console.error('Database check error:', err);
    } finally {
        await pool.end();
    }
}

checkDatabase();