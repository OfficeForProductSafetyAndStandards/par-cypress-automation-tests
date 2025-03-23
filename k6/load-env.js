const dotenv = require('dotenv');
const fs = require('fs');

const envFile = `.env.${process.env.TEST_ENV || 'local'}`;
const envConfig = dotenv.parse(fs.readFileSync(envFile));

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

console.log(`PERF_URL=${process.env.PERF_URL}`);
