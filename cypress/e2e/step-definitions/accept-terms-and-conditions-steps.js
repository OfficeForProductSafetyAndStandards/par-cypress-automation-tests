import {Given, When} from '@badeball/cypress-cucumber-preprocessor';
import AcceptTermsAndConditionsPage from "../../pages/AcceptTermsAndConditionsPage";


const acceptTermsAndConditionsPage = new AcceptTermsAndConditionsPage();

When(/^I click on the Terms and conditions hyperlink$/, function () {
    acceptTermsAndConditionsPage.clickTermsLink();
});
Given(/^I am navigated to the PAR (Terms and conditions) new tab$/, function (expectedText) {
    acceptTermsAndConditionsPage.verifyTermsPageOpens(expectedText);
});
Given(/^I have confirmed the acceptance of T&Cs and save and continue$/, function () {
    acceptTermsAndConditionsPage.acceptTermsCheckbox();
    acceptTermsAndConditionsPage.clickSaveAndContinue();
});