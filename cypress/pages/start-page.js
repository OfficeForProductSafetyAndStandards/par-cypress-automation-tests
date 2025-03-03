import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = 'h1';
const BUTTON_SELECTOR = 'a.govuk-button--start';

class StartPage extends UiCommonActions {
    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        content.paragraphs.forEach((text) => {
            this.elementContainsText('main', text);
        });
        this.elementShouldHaveText(BUTTON_SELECTOR, content.button);
    }

}

export default StartPage;