import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const query = async (sql, params = []) => {
    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        return res.rows;
    } catch (err) {
        console.error(' DB Query Error:', err);
        throw err;
    } finally {
        client.release();
    }
};
