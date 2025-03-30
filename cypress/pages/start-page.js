import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const START_NOW_BUTTON = '[data-testid="start-button"]';
const MAIN_CONTENT_SELECTOR = 'main';
const BULLET_LIST_ITEMS = 'ul.govuk-list--bullet li';
const INSET_TEXT_SELECTOR = '.govuk-inset-text';

class StartPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveTrimmedText(HEADING_SELECTOR, content.heading);
        content.paragraphs.forEach((text) => {
            this.elementContainsTrimmedText(MAIN_CONTENT_SELECTOR, text);
        });
        content.bullets.forEach((bulletText) => {
            this.elementContainsTrimmedText(BULLET_LIST_ITEMS, bulletText);
        });
        if (content.insetText) {
            this.elementContainsTrimmedText(INSET_TEXT_SELECTOR, content.insetText);
        }
        this.elementShouldHaveTrimmedText(START_NOW_BUTTON, content.button);
    }

    navigateUsingBrowser(action) {
        this.navigate(action);
    }
}

export default StartPage;
