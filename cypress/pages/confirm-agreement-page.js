import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = 'h1';
const INSET_TEXT_SELECTOR = '.govuk-inset-text';
const CONFIRMATION_TEXT_SELECTOR = '.govuk-fieldset p';
const CRITERIA_LABELS_SELECTOR = '.govuk-checkboxes__label';
const CONTINUE_BUTTON_SELECTOR = '#confirm-button';

const CRITERIA_CHECKBOXES = [
    '#confirm-criteria',
    '#confirm-criteria-2',
    '#confirm-criteria-3'
];

class ConfirmAgreementPage extends UiCommonActions {

    validatePageContent(pageContent) {
        this.elementShouldHaveText(HEADING_SELECTOR, pageContent.header);
        this.elementContainsText(INSET_TEXT_SELECTOR, pageContent.insetText);
        this.elementShouldHaveText(CONFIRMATION_TEXT_SELECTOR, pageContent.confirmationText);

        pageContent.criteria.forEach((criterion) => {
            this.elementContainsText(CRITERIA_LABELS_SELECTOR, criterion);
        });

        this.elementShouldHaveText(CONTINUE_BUTTON_SELECTOR, pageContent.buttonText);
    }

    checkAllCriteria() {
        CRITERIA_CHECKBOXES.forEach((checkbox) => {
            cy.get(checkbox).check({ force: true });
        });
    }

    clickContinue() {
        cy.get(CONTINUE_BUTTON_SELECTOR).click();
    }
}

export default ConfirmAgreementPage;