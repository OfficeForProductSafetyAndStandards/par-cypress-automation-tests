import UiCommonActions from './ui-common-actions';

const TEXT_ELEMENT = 'h2';

class HomePage extends UiCommonActions {

    navigateToUrl(pageTitleSubstring) {
        this.openUrl(Cypress.env('BASE_UI_URL'));
        this.verifyPageTitleContains(pageTitleSubstring);
    }

    navigateUsingDeepLink(deepLink) {
        this.openUrl(`${Cypress.env('BASE_UI_URL')}${deepLink}`);
    }

    validateTextOnPage(text) {
        this.elementShouldHaveText(TEXT_ELEMENT, text);
    }
}

export default HomePage;
