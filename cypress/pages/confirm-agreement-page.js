import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const INSET_TEXT_SELECTOR = '[data-testid="page-inset-text"]';
const CONFIRMATION_TEXT_SELECTOR = '[data-testid="confirm-criteria"] .govuk-fieldset p';
const CRITERIA_CHECKBOXES = [
    '[data-testid="confirm-criteria-organisation-elegible"]',
    '[data-testid="confirm-criteria-authority-suitable"]',
    '[data-testid="confirm-criteria-summary-created"]'
];
const CRITERIA_LABELS_SELECTOR = '.govuk-checkboxes__label';
const CONTINUE_BUTTON_SELECTOR = '[data-testid="confirm-button"]';

class ConfirmAgreementPage extends UiCommonActions {

    validatePageContent(pageContent) {
        this.elementShouldHaveTrimmedText(HEADING_SELECTOR, pageContent.header);
        this.elementContainsTrimmedText(INSET_TEXT_SELECTOR, pageContent.insetText);
        this.elementShouldHaveTrimmedText(CONFIRMATION_TEXT_SELECTOR, pageContent.confirmationText);

        pageContent.criteria.forEach((criterion, index) => {
            cy.get(CRITERIA_LABELS_SELECTOR).eq(index).invoke('text').then((text) => {
                expect(text.trim()).to.eq(criterion);
            });
        });

        this.elementShouldHaveTrimmedText(CONTINUE_BUTTON_SELECTOR, pageContent.buttonText);
    }

    checkAllCriteria() {
        CRITERIA_CHECKBOXES.forEach((checkboxSelector) => {
            cy.get(checkboxSelector).check({ force: true });
        });
    }

    clickContinue() {
        cy.get(CONTINUE_BUTTON_SELECTOR).click();
    }
}

export default ConfirmAgreementPage;