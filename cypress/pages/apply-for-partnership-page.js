import UiCommonActions from './ui-common-actions';

const HEADING_SELECTOR = '[data-testid="page-heading"]';
const SUBHEADING_SELECTOR = '[data-testid="secondary-heading"]';
const PARAGRAPH_SELECTOR = 'p';
const BULLET_POINT_SELECTOR = 'ul.govuk-list--bullet li';
const START_BUTTON_SELECTOR = '[data-testid="start-button"]';

class ApplyForPartnershipPage extends UiCommonActions {

    validatePageContent(content) {
        this.elementShouldHaveTrimmedText(HEADING_SELECTOR, content.heading);

        content.paragraphs.forEach((text) => {
            this.elementContainsTrimmedText(PARAGRAPH_SELECTOR, text);
        });

        this.elementShouldHaveTrimmedText(SUBHEADING_SELECTOR, content.subheading);

        content.bulletPoints.forEach((text) => {
            this.elementContainsTrimmedText(BULLET_POINT_SELECTOR, text);
        });

        this.elementShouldHaveTrimmedText(START_BUTTON_SELECTOR, content.button);
    }

    validatePageByPageTitle(pageTitle) {
        this.verifyPageTitleContains(pageTitle);
    }
}

export default ApplyForPartnershipPage;