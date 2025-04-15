import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import GetProfileActions from "../../api-actions/getProfileActions";
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

    return getProfileActions.getAuthToken(payload).then((res) => {
        bearerToken = res.body.token;
    });
});

When('I call the getMyProfile endpoint with the stored bearer token', function () {
    return getProfileActions.getProfile(bearerToken).then((res) => {
        profileResponse = res;
    });
});

Then('the response should contain a valid profile with all expected attributes', function () {
    const profile = profileResponse.body;

    expect(profile).to.have.property('userId');
    expect(profile).to.have.property('emailAddress');
    expect(profile).to.have.property('roles').that.is.an('array');
    expect(profile).to.have.property('organisationName');
});
