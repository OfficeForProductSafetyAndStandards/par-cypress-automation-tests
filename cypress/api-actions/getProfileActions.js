const RequestCommonActions = require("./request-common-actions");
const GET_TOKEN_ENDPOINT = '/Jwt/get-auth-token';
const GET_MY_PROFILE_ENDPOINT = '/api/GetMyProfileQuery';

class GetProfileActions extends RequestCommonActions {
    getAuthToken(payload) {
        return this.postRequest(`${Cypress.env('API_URL')}${GET_TOKEN_ENDPOINT}`, payload);
    }

    getProfile(bearerToken) {
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
        };
        return this.getRequest(`${Cypress.env('API_URL')}${GET_MY_PROFILE_ENDPOINT}`, headers);
    }
}

module.exports = GetProfileActions;
