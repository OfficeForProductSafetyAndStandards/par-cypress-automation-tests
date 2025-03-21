import {Then} from '@badeball/cypress-cucumber-preprocessor';
import ConfirmAgreementPage from "../../pages/confirm-agreement-page";

const confirmAgreementPage = new ConfirmAgreementPage();


Then(/^I confirm that I meet the below criteria before continuing$/, function (dataTable) {

});

Then(/^I confirm that I meet the all criteria before continuing$/, function () {
    confirmAgreementPage.checkAllCriteria()
});