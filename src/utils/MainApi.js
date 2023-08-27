/** API */
import { mainApiBaseUrl } from "./constants";

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
        return this._request(`${this._baseUrl}/movies`, {
            credentials: 'include',
            headers: this._headers
        })
    }

    addLike(card) {
        return this._request(`${this._baseUrl}/movies`, {
            credentials: 'include',
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(card)
        })
    }

    removeLike(cardId) {
        return this._request(`${this._baseUrl}/movies/${cardId}`, {
            credentials: 'include',
            headers: this._headers,
            method: 'DELETE'
        })
    }

    changeLikeCardStatus(card, isLiked) {
        if (isLiked) {
            return this.removeLike(card._id);
        } else {
            return this.addLike(card);
        }
    }

    updateUserInfo(userInfo) {
        return this._request(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(userInfo)
        })
    }

    register(name, email, password) {
        return this._request(`${this._baseUrl}/signup`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    };

    login(email, password) {
        return this._request(`${this._baseUrl}/signin`, {
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    };

    logout() {
        return this._request(`${this._baseUrl}/signout`, {
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: 'GET'
        });
    }

    validateToken() {
        return this._request(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'GET'
        });
    };
}

export const mainApi = new Api({
    baseUrl: mainApiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
}); 
