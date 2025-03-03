import UiCommonActions from './ui-common-actions';

const MAIN_HEADER_ELEMENT = 'h1';
const deepLinks = {
    "Apply for a new partnership": "authority/partnership-application/initiate/start",
    "PAR Home Page": "authority"
};

class HomePage extends UiCommonActions {

    navigateToUrl(pageTitleSubstring) {
        this.openUrl(Cypress.env('BASE_UI_URL'));
        this.verifyPageTitleContains(pageTitleSubstring);
    }

    navigateUsingDeepLink(deepLink) {
        this.openUrl(`${Cypress.env('BASE_UI_URL')}${deepLinks[deepLink]}`);
    }

    validateTextOnPage(text) {
        this.elementShouldHaveText(MAIN_HEADER_ELEMENT, text);
    }
}

export default HomePage;
