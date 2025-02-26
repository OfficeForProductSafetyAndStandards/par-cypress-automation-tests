import { Then } from '@badeball/cypress-cucumber-preprocessor';
import ApplyForPartnershipPage from '../../pages/apply-for-partnership-page';

const applyForPartnershipPage = new ApplyForPartnershipPage();

Then(/^I am navigated to the (.*) page$/, function (pageTitle) {
    applyForPartnershipPage.validatePageByPageTitle(pageTitle);
});

Then(/^I can read all information on the page$/, function (dataTable) {
    const filename = dataTable.hashes()[0].content;
    cy.fixture(filename).then((pageContent) => {
        applyForPartnershipPage.validatePageContent(pageContent);
    });
});

