'use strict';

const UNAUTHORIZED = 401;
const EXTERNAL_SERVER_ERROR = 500;

export default class Api {
    constructor($http, $state, $rootScope) {
        this.api = "http://dt-agency.ru/api/v1";
        this.http = $http;
        this.state = $state;
        this.rootscope = $rootScope;
    } 

    get(url, config) {
        const configObj = Object.assign(config || {}, {headers: this.headers});
        return this.http.get(this.api + url, configObj).catch(response => {
            this.handleResponse(response);
        });
    }

    post(url, data) {
        return this.http.post(this.api + url, data, {
            headers: this.headers
        }).catch(response => {
            this.handleResponse(response);
        });
    }

    put(url, data) {
        return this.http.put(this.api + url, data, {
            headers: this.headers
        }).catch(response => {
            this.handleResponse(response);
        });
    }

    delete(url, data) {
        const configObj = Object.assign(data || {}, {headers: this.headers});
        return this.http.delete(this.api + url, configObj).catch(response => {
            this.handleResponse(response);
        });
    }

    get url() {
        return this.api;
    }

    get headers() {
        return {};
    }

    isAuthorized(response) {
        return response.status !== UNAUTHORIZED;
    }

    isExternalServerError(response) {
        return response.status === EXTERNAL_SERVER_ERROR;
    }

    handleResponse(response) {
        if (!this.isAuthorized(response)) {

        }

        if (this.isExternalServerError(response)) {
            //
        }

        throw response;
    }


    get url() {
        return this.api;
    }
}

