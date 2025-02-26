import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = 'h1';
const SUBHEADING_SELECTOR = 'h3';
const PARAGRAPH_SELECTOR = 'p';
const BULLET_POINT_SELECTOR = 'ul.govuk-list--bullet li';
const START_BUTTON = '#start-button';

class ApplyForPartnershipPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveText(HEADING_SELECTOR, content.heading);
        content.paragraphs.forEach((text) => {
            this.elementContainsText(PARAGRAPH_SELECTOR, text);
        });
        this.elementShouldHaveText(SUBHEADING_SELECTOR, content.subheading);
        content.bulletPoints.forEach((text) => {
            this.elementContainsText(BULLET_POINT_SELECTOR, text);
        });
        this.elementShouldHaveText(START_BUTTON, content.button);
    }

    validatePageByPageTitle(pageTitle) {
        this.verifyPageTitleContains(pageTitle);
    }
}

export default ApplyForPartnershipPage;
