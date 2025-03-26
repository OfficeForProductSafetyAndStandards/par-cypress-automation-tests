const { Pool } = require('pg');
require('dotenv').config({ path: `.env.${process.env.CYPRESS_ENV || 'test'}` });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
});

const query = async (sql, params = []) => {
    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        return res.rows;
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    query,
};
