import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import GetProfileActions from "../../api-actions/getProfileActions";
import HomePage from "../../pages/home-page";

let bearerToken;
let profileResponse;

const getProfileActions = new GetProfileActions();
const homePage = new HomePage();

Given('I authenticate via the get-auth-token endpoint with the following credentials:', function (dataTable) {
    const credentials = dataTable.rowsHash();
    const email = homePage.getUserCredential(credentials.Email).username;
    const impersonationApiKey = Cypress.env('IMPERSONATION_KEY');

    const payload = {
        idToken: credentials.IdToken,
        accessToken: credentials.AccessToken,
        email,
        providerKey: credentials.ProviderKey,
        impersonationApiKey,
    };

    console.log(payload);

    return getProfileActions.getAuthToken(payload).then((res) => {
        bearerToken = res.body;
        console.log(bearerToken);

    });
});

When('I call the getMyProfile endpoint with the stored bearer token', function () {
    return getProfileActions.getProfile(bearerToken).then((res) => {
        profileResponse = res;
    });
});

Then('the response should contain a valid profile with all expected attributes', function () {
    const profile = profileResponse.body;
    console.log(profile);
    console.log(profile.body);
    expect(profile).to.have.property('hasAcceptedTermsAndConditions', true);
});
