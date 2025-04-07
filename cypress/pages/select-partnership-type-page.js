import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const DETAILS_SUMMARY_SELECTOR = '[data-testid="page-details"] summary';
const DETAILS_TEXT_SELECTOR = '[data-testid="page-details"] .govuk-details__text';
const DIRECT_RADIO_SELECTOR = '[data-testid="partnership-type-direct-radio"]';
const COORDINATED_RADIO_SELECTOR = '[data-testid="partnership-type-coordinated-radio"]';
const CONTINUE_BUTTON_SELECTOR = '[data-testid="continue-button"]';
const BACK_LINK_SELECTOR = '[data-testid="back-button"]';

class SelectPartnershipTypePage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        this.elementShouldHaveText(DETAILS_SUMMARY_SELECTOR, content.detailsSummary);
        this.elementContainsText(DETAILS_TEXT_SELECTOR, content.detailsText.direct);
        this.elementContainsText(DETAILS_TEXT_SELECTOR, content.detailsText.coordinated);
        this.elementShouldHaveText(CONTINUE_BUTTON_SELECTOR, content.button);
        this.elementShouldHaveText(BACK_LINK_SELECTOR, content.backLink);
    }

    selectPartnershipType(partnershipType) {
       const partnershipActions ={
           direct:this.selectDirectPartnership,
           coordinated:this.selectCoordinatedPartnership,
       }
        partnershipActions[partnershipType]?.call(this);
    }

    selectDirectPartnership() {
        this.checkRadioButton(DIRECT_RADIO_SELECTOR);
    }

    selectCoordinatedPartnership() {
        this.checkRadioButton(COORDINATED_RADIO_SELECTOR);
    }

    clickContinue() {
        this.forceClick(CONTINUE_BUTTON_SELECTOR);
    }

    toggleDetailsSummary() {
        this.forceClick(DETAILS_SUMMARY_SELECTOR);
    }

    verifyDetailsVisible() {
        cy.get(DETAILS_TEXT_SELECTOR).should('be.visible');
    }

    clickOnBacklink() {
        this.clickOnElement(BACK_LINK_SELECTOR);
    }
}

export default SelectPartnershipTypePage;