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

    clickButtonByText(buttonText) {
        cy.contains('button', buttonText).should('be.visible').click();
    }

    elementShouldHaveText(locator, text) {
        cy.get(locator).should('be.visible').should('have.text', text);
    }

    elementContainsText(selector, text) {
        cy.contains(selector, text).should('be.visible');
    }
}

export default UiCommonActions;
