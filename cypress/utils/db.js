const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//const pool = new Pool({
//     user: Cypress.env('DB_USER'),
//     host: Cypress.env('DB_HOST'),
//     database: Cypress.env('DB_NAME'),
//     password: Cypress.env('DB_PASSWORD'),
//     port: Cypress.env('DB_PORT'),
// });

const query = async (sql, params = []) => {

    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        return res.rows;
    } finally {
        client.release();
    }
};

const getFirstUserIdentityId = async () => {
    const result = await query(`SELECT "UserIdentityId" FROM "UserProfile" LIMIT 1`);
    return result[0]?.UserIdentityId;
};

const setTermsAccepted = async (userId, value) => {
    return query(`
    UPDATE "UserProfile"
    SET "HasAcceptedTermsAndConditions" = $1
    WHERE "UserIdentityId" = $2
  `, [value, userId]);
};

module.exports = {
    query,
    getFirstUserIdentityId,
    setTermsAccepted,
};
 