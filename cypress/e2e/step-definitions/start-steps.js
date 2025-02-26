import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import HomePage from "../../pages/home-page";

const homePage = new HomePage();

Given(/^I am on (.*)$/, function (pageTitle) {
    homePage.navigateToUrl(pageTitle)
});

Then(/^the page main header is (Primary Authority Register)$/, function (mainHeader) {
    homePage.validateTextOnPage(mainHeader);
});

When(/^I navigate to the (.*) page$/, function (deeplink) {
    homePage.navigateUsingDeepLink(deeplink);
});

When(/^I click on the (.*) button$/, function (button) {
    homePage.clickButtonByText(button)
});
