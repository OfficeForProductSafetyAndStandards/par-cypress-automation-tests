import { Then } from '@badeball/cypress-cucumber-preprocessor';
import ConfirmAgreementPage from '../../pages/confirm-agreement-page';
import ApplyForPartnershipPage from '../../pages/apply-for-partnership-page';
import StartPage from "../../pages/start-page";

const pages = {
    ConfirmAgreementPage: new ConfirmAgreementPage(),
    ApplyForPartnershipPage: new ApplyForPartnershipPage(),
    StartPage: new StartPage(),
};

Then(/^I can read all information on the page$/, function (dataTable) {
    const { page, content } = dataTable.hashes()[0];

    if (!pages[page]) {
        throw new Error(` Page object "${page}" is not defined.`);
    }

    cy.fixture(content).then((pageContent) => {
        pages[page].validatePageContent(pageContent);
    });
});