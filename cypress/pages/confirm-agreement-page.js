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
const criteriaMapping = {
    "The organisation is eligible to enter into a partnership": '[data-testid="confirm-criteria-organisation-elegible"]',
    "My local authority is suitable for nomination as the Primary authority": '[data-testid="confirm-criteria-authority-suitable"]',
    "A written summary detailing the partnership has been created": '[data-testid="confirm-criteria-summary-created"]'
};

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
            cy.get(checkboxSelector).check({force: true});
        });
    }

    clickContinue() {
        cy.get(CONTINUE_BUTTON_SELECTOR).click();
    }

    selectSpecificCriteria(dataTable) {
        const criteriaToCheck = dataTable.rawTable.flat();
        criteriaToCheck.forEach((criterion) => {
            const checkBoxSelector = criteriaMapping[criterion];
            if (checkBoxSelector) {
                this.checkRadioButton(checkBoxSelector);
            }
            else {
                throw new Error(`Unknown criterion: ${criterion}  - Ensure it matches exactly as expected`);
            }
        })
    }
}

export default ConfirmAgreementPage;