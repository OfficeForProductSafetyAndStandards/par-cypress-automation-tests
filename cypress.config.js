const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const dotenv = require('dotenv');

const environment = process.env.CYPRESS_ENV || 'test';
dotenv.config({ path: `.env.${environment}` });

async function setupNodeEvents(on, config) {
    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    on(
        'file:preprocessor',
        createBundler({
            plugins: [createEsbuildPlugin.default(config)],
        })
    );

    return config;
}

module.exports = defineConfig({
    e2e: {
        setupNodeEvents,
        specPattern: 'cypress/e2e/features/*.feature',
        baseUrl: process.env.BASE_UI_URL,
        chromeWebSecurity: false,
        video: true,
        screenshotOnRunFailure: true,
        retries: {
            runMode: 1,
            openMode: 0,
        },
    },

    reporter: 'cypress-multi-reporters',
        reporterOptions: {
            configFile: 'cypress/report/reporter-config.json',
        },

    env: {
        BASE_UI_URL: process.env.BASE_UI_URL,
    },
});
