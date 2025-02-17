class UiCommonActions {
    openUrl(url) {
        cy.visit(url);
    }

    verifyPageTitleContains(substring) {
        cy.title().should('contain', substring);
    }

    sendKeys(locator, text) {
        cy.get(locator).should('be.visible').clear().type(text);
    }

    clickOnElement(locator) {
        cy.get(locator).should('be.visible').scrollIntoView().click();
    }

    elementShouldHaveText(locator, text) {
        cy.get(locator).should('be.visible').should('have.text', text);
    }
}

export default UiCommonActions;
