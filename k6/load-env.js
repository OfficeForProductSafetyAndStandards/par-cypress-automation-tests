const dotenv = require('dotenv');
const fs = require('fs');

const envFile = `.env.${process.env.TEST_ENV || 'local'}`;
const envConfig = dotenv.parse(fs.readFileSync(envFile));

for (const k in envConfig) {
    console.log(`--env ${k}=${envConfig[k]}`);
}
