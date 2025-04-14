import {Given, When,Then} from '@badeball/cypress-cucumber-preprocessor';
import HomePage from "../../pages/home-page";
import GetProfileActions from "../../api-actions/getProfileActions";

const getProfileActions = new GetProfileActions();
const homePage = new HomePage();

let bearerToken;
let profileResponse;

Given('I authenticate via the get-auth-token endpoint with the following credentials:', async (dataTable) => {
    const credentials = dataTable.rowsHash();

    const email = homePage.getUserCredential(credentials.Email).username;
    const impersonationApiKey = Cypress.env(credentials.ImpersonationApiKey);

    const payload = {
        idToken: credentials.IdToken,
        accessToken: credentials.AccessToken,
        email,
        providerKey: credentials.ProviderKey,
        impersonationApiKey,
    };

    const response = await getProfileActions.getAuthToken(payload);
    bearerToken = response.body.token;
});

When('I call the getMyProfile endpoint with the stored bearer token', async () => {
    profileResponse = await getProfileActions.getProfile(bearerToken);
});

Then('the response should contain a valid profile with all expected attributes', () => {
    const profile = profileResponse.body;

    expect(profile).to.have.property('userId');
    expect(profile).to.have.property('emailAddress');
    expect(profile).to.have.property('roles').that.is.an('array');
    expect(profile).to.have.property('organisationName');
});
