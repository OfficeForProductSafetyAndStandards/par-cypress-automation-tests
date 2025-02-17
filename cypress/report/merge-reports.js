const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');
const path = require('path');

async function generateReport() {
    const jsonDir = path.join(__dirname, 'cypress', 'report', 'mochawesome');
    const reportDir = path.join(__dirname, 'cypress', 'report', 'mochawesome', 'html');

    const jsonReport = await merge({
        files: [`${jsonDir}/*.json`],
    });

    await generator.create(jsonReport, {
        reportDir,
        reportFilename: 'index.html',
        inlineAssets: true,
        overwrite: true,
        charts: true,
        reportTitle: 'PAR Cypress Automation Test Execution',
        reportPageTitle: 'PAR Cypress Automation Report',
        autoOpen: true,
    });

    console.log(`✅ Mochawesome HTML report generated at: ${path.join(reportDir, 'index.html')}`);
}

generateReport();
