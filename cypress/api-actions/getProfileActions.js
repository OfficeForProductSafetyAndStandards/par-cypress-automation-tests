const RequestCommonActions = require("./request-common-actions");

class GetProfileActions extends RequestCommonActions {
    async getAuthToken(payload) {
        return this.postRequest(`${Cypress.env('API_URL')}/get-auth-token`, payload);
    }

    async getProfile(bearerToken) {
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
        };
        return this.getRequest(`${Cypress.env('API_URL')}/getMyProfile`, headers);
    }
}

module.exports = GetProfileActions;
