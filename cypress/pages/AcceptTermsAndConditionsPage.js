import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const TERMS_LINK_SELECTOR = '[data-testid="terms-link"]';
const CHECKBOX_SELECTOR = '[data-testid="accept-terms-checkbox"]';
const SAVE_CONTINUE_BUTTON_SELECTOR = '[data-testid="save-continue-button"]';
const CHECKBOX_LABEL_SELECTOR = 'label[for="accept-terms"]';
const TERMS_AND_CONDITIONS='terms-conditions';

class AcceptTermsAndConditionsPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        this.elementShouldHaveTrimmedText(CHECKBOX_LABEL_SELECTOR, content.checkboxLabel);
        this.elementShouldHaveTrimmedText(SAVE_CONTINUE_BUTTON_SELECTOR, content.button);
        this.elementShouldHaveTrimmedText(TERMS_LINK_SELECTOR, content.termsLinkText);
    }

    clickTermsLink() {
        this.elementShouldBeVisible(TERMS_LINK_SELECTOR);
        cy.get(TERMS_LINK_SELECTOR).should('have.attr', 'target', '_blank');
        this.clickOnElement(TERMS_LINK_SELECTOR);
    }

    acceptTermsCheckbox() {
        this.checkRadioButton(CHECKBOX_SELECTOR);
    }

    clickSaveAndContinue() {
        this.clickOnElement(SAVE_CONTINUE_BUTTON_SELECTOR);
    }
    verifyTermsPageOpens() {
        this.verifyExternalPageContent({
            origin: `${Cypress.env('BASE_UI_URL')}${TERMS_AND_CONDITIONS}`,
            expectedText: 'Terms and Conditions'
        });
    }


}

export default AcceptTermsAndConditionsPage;
