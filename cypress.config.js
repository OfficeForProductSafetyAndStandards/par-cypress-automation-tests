const {defineConfig} = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const environment = process.env.CYPRESS_ENV || 'test';
dotenv.config({path: `.env.${environment}`});

const loadedEnv = {
    BASE_UI_URL: process.env.BASE_UI_URL,
    TEST_USER_ACCOUNT: process.env.TEST_USER_ACCOUNT,
    TEST_USER_ACCOUNT_ONE: process.env.TEST_USER_ACCOUNT_ONE,
    TEST_USER_ACCOUNT_TWO: process.env.TEST_USER_ACCOUNT_TWO,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
};

async function setupNodeEvents(on, config) {
    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    on(
        'file:preprocessor',
        createBundler({
            plugins: [createEsbuildPlugin.default(config)],
        })
    );

    // Accessibility / CSV / Logging Task Hooks
    on('task', {
        log(message) {
            console.log(message);
            return null;
        },

        table(data) {
            console.table(data);
            return null;
        },

        writeCsv({filePath, content}) {
            try {
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, {recursive: true});
                }

                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ CSV file written to: ${filePath}`);
                return null;
            } catch (error) {
                console.error(`❌ Error writing CSV: ${error.message}`);
                return null;
            }
        },

        getUniqueFileName(basePath) {
            let counter = 1;
            let filePath = `${basePath}-${counter}.csv`;

            while (fs.existsSync(filePath)) {
                counter++;
                filePath = `${basePath}-${counter}.csv`;
            }

            console.log(`📄 Unique file generated: ${filePath}`);
            return Promise.resolve(filePath);
        },

        async getFirstUserIdentityId() {
            const result = await db.query(`SELECT "UserIdentityId" FROM "UserProfile" LIMIT 1`);
            return result[0]?.UserIdentityId;
        },

        async setTermsAccepted({ userId, value }) {
            await db.query(
                `UPDATE "UserProfile" SET "HasAcceptedTermsAndConditions" = $1 WHERE "UserIdentityId" = $2`,
                [value, userId]
            );
            return null;
        },
    });


    config.baseUrl = process.env.BASE_UI_URL || config.baseUrl;

    return config;
}

module.exports = defineConfig({
    e2e: {
        setupNodeEvents,
        specPattern: 'cypress/e2e/features/**/*.feature',
        baseUrl: process.env.BASE_UI_URL,
        chromeWebSecurity: false,
        video: true,
        screenshotOnRunFailure: true,
        retries: {
            runMode: 1,
            openMode: 0,
        },
    },

    // Multi-Reporters
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        configFile: 'cypress/report/reporter-config.json',
    },

    env: loadedEnv,
});
