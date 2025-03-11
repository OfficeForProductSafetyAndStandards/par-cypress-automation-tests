import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import PartnershipApplicationPage from '../../pages/partnership-application-page';

const partnershipApplicationPage = new PartnershipApplicationPage();

Then(/^the partnership application page should have the following content$/, function (dataTable) {
    const data = dataTable.rowsHash();
    cy.fixture(data.content).then((pageContent) => {
        partnershipApplicationPage.validatePageHeader(pageContent.header);
        partnershipApplicationPage.validateCompletedSteps(
            data.numberOfSections,
            data.completed
        );

        partnershipApplicationPage.validateSelectPartnershipTypeTask(
            data.taskOneStatus
        );

        partnershipApplicationPage.validatePrimaryAuthorityContactsTask(
            data.taskTwoStatus
        );
    });
});

Then(/^I click on the add regulatory function contact link$/, function () {
    partnershipApplicationPage.clickOnAddRegulatoryFunctionContact();
});

Then(/^I click on the select partnership type link$/, function () {
    partnershipApplicationPage.clickOnSelectPartnership();
});