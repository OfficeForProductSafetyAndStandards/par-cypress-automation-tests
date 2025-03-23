const dotenv = require('dotenv');
const fs = require('fs');

const mode = process.argv[2];
const envFile = `.env.${process.env.TEST_ENV || 'local'}`;
const envConfig = dotenv.parse(fs.readFileSync(envFile));

if (mode === 'bash') {
    for (const k in envConfig) {
        console.log(`${k}="${envConfig[k]}"`);
    }
} else {
    for (const k in envConfig) {
        console.log(`--env ${k}=${envConfig[k]}`);
    }
}
