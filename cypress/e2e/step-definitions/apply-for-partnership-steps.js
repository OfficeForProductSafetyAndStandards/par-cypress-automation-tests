import { Then } from '@badeball/cypress-cucumber-preprocessor';
import ApplyForPartnershipPage from '../../pages/apply-for-partnership-page';

const applyForPartnershipPage = new ApplyForPartnershipPage();

Then(/^I am navigated to the (.*) page$/, function (pageTitle) {
    applyForPartnershipPage.validatePageByPageTitle(pageTitle);
});


