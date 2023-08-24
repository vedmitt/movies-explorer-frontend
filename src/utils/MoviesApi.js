/** API */
import { beatfilmApiBaseUrl } from "./constants";

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(url, options) {
        return fetch(url, options)
            .then(res => {
                return this._getResponseData(res);
            })
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getMovies() {
        return this._request(`${this._baseUrl}`, {
            headers: this._headers
        })
    }
}

export const moviesApi = new Api({
    baseUrl: beatfilmApiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
}); 
