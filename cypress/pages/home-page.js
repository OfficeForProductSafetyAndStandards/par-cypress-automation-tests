import UiCommonActions from './ui-common-actions';

const MAIN_HEADER_ELEMENT = 'h1';
const SIGN_IN_BUTTON = '#sign-in-button';
const USER_NAME_INPUT = '#email';
const PASSWORD_INPUT = '#password';
const CONTINUE_BUTTON = 'Continue';
const START_NOW_BUTTON = 'a.govuk-button--start';

//my home page elements
const HEADING_SELECTOR = '[data-testid="page-heading"]';
const INTRO_TEXT_SELECTOR = 'p.govuk-body';
const BULLET_ITEMS_SELECTOR = 'ul.govuk-list--bullet li';
const APPLY_BUTTON_SELECTOR = '[data-testid="apply-button"]';

const deepLinks = {
    "Apply for a new partnership": "authority/partnership-application/initiate/start",
    "PAR Home Page": "authority",
    "Select partnership type": "authority/partnership-application/initiate/partnership-type/select",
    "Accept terms and conditions":"terms-conditions",
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

    signInWithEmailAndPassword(user) {
        const {username, password} = this.getUserCredential(user);
        this.clickOnElement(START_NOW_BUTTON);
        this.clickOnElement(SIGN_IN_BUTTON);
        this.sendKeys(USER_NAME_INPUT, username);
        this.clickButtonByText(CONTINUE_BUTTON);
        this.sendKeys(PASSWORD_INPUT, password);
        this.clickButtonByText(CONTINUE_BUTTON);
    }

    getUserCredential(user) {
        const password = Cypress.env('TEST_USER_PASSWORD');

        const users = {
            testUserAccount: Cypress.env('TEST_USER_ACCOUNT'),
            testUserAccountOne: Cypress.env('TEST_USER_ACCOUNT_ONE'),
            testUserAccountTwo: Cypress.env('TEST_USER_ACCOUNT_TWO'),
        };

        const username = users[user];

        if (!username || !password) {
            throw new Error(`Missing credentials for ${user}. Check your environment variables.`);
        }

        return { username, password };
    }

    validatePageUrlContainsString(subString) {
        this.verifyPageUrlContains(subString);
    }

    validatePageContent(content) {
        this.elementShouldHaveTrimmedText(HEADING_SELECTOR, content.heading);
        this.elementShouldHaveTrimmedText(INTRO_TEXT_SELECTOR, content.introText);

        content.bullets.forEach((itemText) => {
            this.elementContainsTrimmedText(BULLET_ITEMS_SELECTOR, itemText);
        });

        this.elementShouldHaveTrimmedText(APPLY_BUTTON_SELECTOR, content.button);
    }

    verifyHeaderText(expectedText) {
        this.waitForTextVisible(HEADING_SELECTOR, expectedText);
    }
}

export default HomePage;
