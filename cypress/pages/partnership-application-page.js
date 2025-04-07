import UiCommonActions from './ui-common-actions';

const PAGE_HEADING_SELECTOR = '[data-testid="page-heading"]';
const COMPLETED_STEPS_SUMMARY_SELECTOR = '[data-testid="completed-steps-summary"]';
const SAVE_AND_EXIT_BUTTON_SELECTOR = '[data-testid="save-and-exit-button"]';
// Task 1
const PARTNERSHIP_TYPE_TASK_SELECTOR = '[data-testid="partnership-type-task-list"]';
const SELECT_PARTNERSHIP_TYPE_LINK = '[data-testid="select-partnership-type-link"]';
const SELECT_PARTNERSHIP_TYPE_STATUS = '[data-testid="select-partnership-type-status-tag"]';

// Task 2
const PRIMARY_AUTHORITY_CONTACTS_TASK_SELECTOR = '[data-testid="primary-authority-contacts-task-list"]';
const ADD_REGULATORY_FUNCTION_CONTACTS_LINK = '[data-testid="add-regulatory-function-contacts-link"]';
const ADD_REGULATORY_FUNCTION_CONTACTS_STATUS = '[data-testid="add-regulatory-function-contacts-status-tag"]';

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
        this.elementShouldHaveText(SELECT_PARTNERSHIP_TYPE_STATUS, expectedStatus);
    }


    validatePrimaryAuthorityContactsTask(expectedStatus) {
        this.elementShouldBeVisible(PRIMARY_AUTHORITY_CONTACTS_TASK_SELECTOR);
        this.elementContainsText(ADD_REGULATORY_FUNCTION_CONTACTS_LINK, 'Add regulatory function contacts');
        this.elementShouldHaveText(ADD_REGULATORY_FUNCTION_CONTACTS_STATUS, expectedStatus);
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
}

export default PartnershipApplicationPage;