import chalk from 'chalk';

const WCAG_22_AA_STANDARD = { runOnly: { type: 'tag', values: ['wcag22aa'] } };
const WCAG_21_AA_STANDARD = { runOnly: { type: 'tag', values: ['wcag21aa'] } };
const ALL_STANDARD_OPTIONS = {
    runOnly: { type: 'tag', values: ['wcag21a', 'wcag21aa', 'wcag21aaa', 'wcag22aa', 'customTag'] },
};

class AccessibilityActions {
    injectAxe() {
        cy.injectAxe();
        cy.wait(1000);

        cy.window().should((win) => {
            if (!win.axe) {
                throw new Error('🚨 Axe-core was NOT injected!');
            }
        });

        cy.task('log', '✅ Axe-core successfully injected.');
    }


    // Runs accessibility checks using the given standard options.
    checkAccessibility = (standardOptions = ALL_STANDARD_OPTIONS) => {
        cy.window().should('have.property', 'axe');
        cy.wait(1000);

        cy.checkA11y(null, null, (violations) => {
            this.terminalAndCsvLog(violations);
        }, false);
    };

    // Logs accessibility violations to the terminal and saves them to a CSV file.
    terminalAndCsvLog(violations) {
        if (!violations || violations.length === 0) {
            cy.task('log', '✅ No accessibility violations found.');
            return;
        }

        cy.task('log', `🚨 ${violations.length} accessibility violation(s) detected`);
        const violationData = violations.map(({ id, impact, description, nodes }) => ({
            id, impact, description, nodes: nodes.length
        }));

        cy.task('table', violationData);

        violations.forEach(({ id, impact, description, nodes, helpUrl }) => {
            console.log(chalk.red(`🚨 Accessibility Violation Detected`));
            console.log(chalk.red(`ID: ${id}`));
            console.log(chalk.red(`Impact: ${impact}`));
            console.log(chalk.red(`Description: ${description}`));
            console.log(chalk.red(`Nodes: ${nodes.length}`));
            if (helpUrl) {
                console.log(chalk.blue(`Help URL: ${helpUrl}`));
            }
            console.log('------------------------------------------------------------');
        });

        let csvContent = 'id,impact,description,nodes,helpUrl\n';
        violations.forEach(({ id, impact, description, nodes, helpUrl }) => {
            nodes.forEach((node) => {
                csvContent += `${id},${impact},"${description.replace(/"/g, '""')}",${node.html ? node.html.replace(/"/g, '""') : 'N/A'},${helpUrl || 'N/A'}\n`;
            });
        });

        const baseFilePath = 'cypress/a11y-violations/par-accessibility-violations';
        cy.task('getUniqueFileName', baseFilePath).then((filePath) => {
            cy.task('writeCsv', { filePath, content: csvContent }).then(() => {
                cy.task('log', `📄 Accessibility violations written to ${filePath}`);
            });
        });
    }
}

module.exports = { AccessibilityActions, WCAG_22_AA_STANDARD, WCAG_21_AA_STANDARD, ALL_STANDARD_OPTIONS };
