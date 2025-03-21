import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';

class AcceptTermsAndConditionsPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
    }
}

export default AcceptTermsAndConditionsPage;