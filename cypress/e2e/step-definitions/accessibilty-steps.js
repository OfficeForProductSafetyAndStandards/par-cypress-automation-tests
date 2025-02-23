import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { AccessibilityActions, WCAG_22_AA_STANDARD } from '../../accessibility-actions/accessibility-actions';
import HomePage from '../../pages/home-page';

const homePage = new HomePage();
const accessibilityActions = new AccessibilityActions();

Given(/^axe is injected and I visit (.*)$/, function (pageTitleSubstring) {
    homePage.navigateToUrl(pageTitleSubstring);
    cy.wait(1000);
    accessibilityActions.injectAxe();
    cy.window().should('have.property', 'axe');
});



Then("page should not have accessibility violations", () => {
    accessibilityActions.injectAxe();
    accessibilityActions.checkAccessibility(WCAG_22_AA_STANDARD);
});
