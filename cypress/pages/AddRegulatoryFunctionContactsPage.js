import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const BODY_TEXT_SELECTOR = 'p.govuk-body';

class AddRegulatoryFunctionContactsPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        content.paragraphs.forEach((text) => {
            this.elementContainsText(BODY_TEXT_SELECTOR, text);
        });
    }
}

export default AddRegulatoryFunctionContactsPage;