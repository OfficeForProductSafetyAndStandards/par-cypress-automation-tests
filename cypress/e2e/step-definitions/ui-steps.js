import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from "../../pages/home-page";

const homePage = new HomePage();

Given(/^I visit (TIMZTOS SOLUTIONS)$/, function (pageTitleSubstring) {
    homePage.navigateToUrl(pageTitleSubstring);
});
When(/^I navigate to the (.*) page$/, function (deeplink) {
    homePage.navigateUsingDeepLink(deeplink);
});
Then(/^page should have text : (.*)$/, function (text) {
    homePage.validateTextOnPage(text);
});
