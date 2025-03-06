import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = 'h1';
const START_NOW_BUTTON = 'a.govuk-button--start';

class StartPage extends UiCommonActions {
    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        content.paragraphs.forEach((text) => {
            this.elementContainsText('main', text);
        });
        this.elementShouldHaveText(START_NOW_BUTTON, content.button);
    }

}

export default StartPage;