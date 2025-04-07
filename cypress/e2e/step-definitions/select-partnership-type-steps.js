import {When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SelectPartnershipTypePage from "../../pages/select-partnership-type-page";


const selectPartnershipTypePage = new SelectPartnershipTypePage();

Then(/^I can view the details information$/, function () {
    selectPartnershipTypePage.toggleDetailsSummary();
    selectPartnershipTypePage.verifyDetailsVisible();
});
When(/^I select (direct|coordinated) as partnership type$/, function (partnershipType) {
    selectPartnershipTypePage.selectPartnershipType(partnershipType);
});
When(/^I click on back link on select partnership type page$/, function () {
    selectPartnershipTypePage.clickOnBacklink();
});