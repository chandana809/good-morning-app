require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection configuration for creating database
const initialPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Create database if it doesn't exist
const createDatabase = async () => {
  try {
    await initialPool.query(`CREATE DATABASE goodmorning_db`);
    console.log('Database created successfully');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', error);
    }
  } finally {
    await initialPool.end();
  }
};

// Main connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'goodmorning_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Create table if not exists
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Initialize database and table
const initializeDatabase = async () => {
  await createDatabase();
  await createTable();
};

initializeDatabase();

// API endpoint to handle form submissions
app.post('/api/submit', async (req, res) => {
    try {
        console.log('Received form submission:', req.body);
        const { name, phone, email } = req.body;
        
        // Validate input
        if (!name || !phone || !email) {
            console.log('Missing required fields');
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        console.log('Attempting database insertion...');
        const result = await pool.query(
            'INSERT INTO user_submissions (name, phone, email) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, email]
        );
        
        console.log('Data inserted successfully:', result.rows[0]);
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({
            success: false,
            error: 'Error submitting data: ' + error.message
        });
    }
});app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});