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
        cy.get(locator).should('be.visible').should('have.text', text.trim());
    }

    elementContainsText(selector, text) {
        cy.contains(selector, text).should('be.visible');
    }

    elementShouldHaveTrimmedText(locator, expectedText) {
        cy.get(locator)
            .should('be.visible')
            .invoke('text')
            .then((actualText) => {
                const normalize = (text) =>
                    text.replace(/\s+/g, ' ').trim();
                expect(normalize(actualText)).to.eq(normalize(expectedText));
            });
    }
}

export default UiCommonActions;
