
class UiCommonActions {
    openUrl(url) {
        cy.visit(url);
    }

    navigate(action) {
        const actions = {
            back: () => cy.go('back'),
            forward: () => cy.go('forward'),
            refresh: () => cy.reload()
        };
        actions[action]?.();
    }

    verifyPageTitleContains(substring) {
        cy.title().should('contain', substring);
    }

    verifyPageUrlContains(substring) {
        cy.url().should('contain', substring);
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

    forceClick(locator) {
        cy.get(locator).click({force: true});
    }

    checkRadioButton(selector) {
        cy.get(selector).check({force: true});
    }

    elementShouldBeVisible(selector) {
        cy.get(selector).should('be.visible');
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

    elementContainsTrimmedText(locator, expectedText) {
        cy.get(locator).should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).to.include(expectedText);
        });
    }

    pageShouldHaveTrimmedText(expectedText) {
        cy.contains(expectedText).should('exist');
    }

    validateErrorMessages(errors) {
        errors.forEach(({testId, message}) => {
            cy.get(`[data-testid="${testId}"]`)
                .should('be.visible')
                .and('contain.text', message.trim());
        });
    }

    verifyExternalPageContent({origin, expectedText}) {
        cy.origin(origin, () => {
            cy.contains(expectedText).should('exist');
        });
    }

    waitForTextVisible(selector, expectedText) {
        cy.get(selector).should('be.visible').and('contain.text', expectedText);
    }

}

export default UiCommonActions;
