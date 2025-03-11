import {Then} from '@badeball/cypress-cucumber-preprocessor';
import ConfirmAgreementPage from '../../pages/confirm-agreement-page';
import ApplyForPartnershipPage from '../../pages/apply-for-partnership-page';
import StartPage from "../../pages/start-page";
import SelectPartnershipTypePage from "../../pages/select-partnership-type-page";
import AddRegulatoryFunctionContactsPage from "../../pages/AddRegulatoryFunctionContactsPage";

const pages = {
    ConfirmAgreementPage: new ConfirmAgreementPage(),
    ApplyForPartnershipPage: new ApplyForPartnershipPage(),
    StartPage: new StartPage(),
    SelectPartnershipTypePage: new SelectPartnershipTypePage(),
    AddRegulatoryFunctionContactsPage: new AddRegulatoryFunctionContactsPage(),
};

Then(/^I can read all information on the page$/, function (dataTable) {
    const {page, content} = dataTable.hashes()[0];

    if (!pages[page]) {
        throw new Error(` Page object "${page}" is not defined.`);
    }

    cy.fixture(content).then((pageContent) => {
        pages[page].validatePageContent(pageContent);
    });
});

Then(/^I should see the following error messages on (.*)$/, function (pageObject, dataTable) {
    const errors = dataTable.hashes();
    pages[pageObject].validateErrorMessages(errors);
});

Then(/^I navigate (back|forward) using browser$/, function (action) {
    pages['StartPage'].navigateUsingBrowser(action);
});