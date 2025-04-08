import UiCommonActions from './ui-common-actions';

// Selectors
const PAGE_HEADING_SELECTOR = '[data-testid="page-heading"]';
const SAVE_AND_EXIT_BUTTON_SELECTOR = '[data-testid="save-and-exit-button"]';
const COMPLETED_STEPS_SUMMARY_SELECTOR = '[data-testid="completed-steps-summary"]';
const COMPLETED_STEPS_COUNT = '[data-testid="completed-steps-done-count"]';

// Task 1
const PARTNERSHIP_TYPE_TASK_SELECTOR = '[data-testid="partnership-type-task-list"]';
const SELECT_PARTNERSHIP_TYPE_LINK = '[data-testid="select-partnership-type-link"]';
const SELECT_PARTNERSHIP_TYPE_STATUS_TAG = '[data-testid="select-partnership-type-status-tag"]';

// Task 2
const PRIMARY_AUTHORITY_CONTACTS_TASK_SELECTOR = '[data-testid="primary-authority-contacts-task-list"]';
const ADD_REGULATORY_FUNCTION_CONTACTS_LINK = '[data-testid="add-regulatory-function-contacts-link"]';
const ADD_REGULATORY_FUNCTION_CONTACTS_STATUS_TAG = '[data-testid="add-regulatory-function-contacts-status-tag"]';

class PartnershipApplicationPage extends UiCommonActions {

    validatePageHeader(expectedHeader) {
        this.elementContainsText(PAGE_HEADING_SELECTOR, expectedHeader);
        this.elementContainsText(SAVE_AND_EXIT_BUTTON_SELECTOR, 'Save and exit applicaiton');
    }

    validateCompletedSteps(numberOfSections, completed) {
        const expectedSummary = `You have completed ${completed} of ${numberOfSections} sections.`;
        this.elementShouldHaveTrimmedText(COMPLETED_STEPS_SUMMARY_SELECTOR, expectedSummary);
    }

    validateSelectPartnershipTypeTask(expectedStatus) {
        this.elementShouldBeVisible(PARTNERSHIP_TYPE_TASK_SELECTOR);
        this.elementContainsText(SELECT_PARTNERSHIP_TYPE_LINK, 'Select partnership type');
        this.elementShouldHaveText(SELECT_PARTNERSHIP_TYPE_STATUS_TAG, expectedStatus);
    }

    validatePrimaryAuthorityContactsTask(expectedStatus) {
        this.elementShouldBeVisible(PRIMARY_AUTHORITY_CONTACTS_TASK_SELECTOR);
        this.elementContainsText(ADD_REGULATORY_FUNCTION_CONTACTS_LINK, 'Add regulatory function contacts');
        this.elementShouldHaveText(ADD_REGULATORY_FUNCTION_CONTACTS_STATUS_TAG, expectedStatus);
    }

    clickOnAddRegulatoryFunctionContact() {
        this.clickOnElement(ADD_REGULATORY_FUNCTION_CONTACTS_LINK);
    }

    clickOnSelectPartnership() {
        this.clickOnElement(SELECT_PARTNERSHIP_TYPE_LINK);
    }

    clickOnTheSaveAndExitButton() {
        this.clickOnElement(SAVE_AND_EXIT_BUTTON_SELECTOR);
    }

    validateInitialState({header, saveAndExitText, completedSummary, tasks}) {
        this.elementShouldHaveTrimmedText(PAGE_HEADING_SELECTOR, header);
        this.elementShouldHaveTrimmedText(SAVE_AND_EXIT_BUTTON_SELECTOR, saveAndExitText);

        const summaryText = `You have completed ${completedSummary.done} of ${completedSummary.total} sections.`;
        this.elementShouldHaveTrimmedText(COMPLETED_STEPS_SUMMARY_SELECTOR, summaryText);

        tasks.forEach(({name, status}) => {
            cy.contains('[data-testid$="-link"], [data-testid$="-link"] div', name).should('exist');
            cy.contains('[data-testid$="status-tag"]', status).should('exist');
        });
    }

    waitForAndCaptureApplicationIdAndPageLoad(expectedCompleted) {
        return cy.url()
            .should('include', 'task-list?applicationId')
            .then((url) => {
                const match = url.match(/applicationId=([a-f0-9-])/i);
                const appId = match ? match[1] : null;
                expect(appId).not.to.be.null;

                Cypress.env('applicationId', appId);
                cy.get(COMPLETED_STEPS_COUNT, {timeout: 2000})
                    .should('have.text', expectedCompleted);
                return appId;
            });
    }
}

export default PartnershipApplicationPage;
