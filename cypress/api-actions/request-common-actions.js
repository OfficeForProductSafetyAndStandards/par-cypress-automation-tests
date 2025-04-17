class RequestCommonActions {
    getRequest(url, headers = {}) {
        return cy
            .request({
                method: 'GET',
                url,
                headers,
                failOnStatusCode: false,
            })
            .then(this.handleResponse);
    }

    postRequest(url, body, headers = {}) {
        return cy
            .request({
                method: 'POST',
                url,
                body,
                headers,
                failOnStatusCode: false,
            })
            .then(this.handleResponse);
    }

    handleResponse(response) {
        const status = response.status;
        const contentType = response.headers['content-type'];
        let body = response.body;

        if (typeof body === 'object' && contentType?.includes('application/json')) {
            body = JSON.stringify(body);
        }

        if (status < 200 || status >= 300) {
            throw new Error(`Request failed with status ${status}: ${body}`);
        }

        return { status, body: response.body };
    }
}

module.exports = RequestCommonActions;
