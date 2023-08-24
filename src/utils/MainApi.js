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
        return this._request(`${this._baseUrl}`, {
            headers: this._headers
        })
    }

    addLike(card) {
        return this._request(`${this._baseUrl}/movies`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(card)
        })
    }

    removeLike(cardId) {
        return this._request(`${this._baseUrl}/movies/${cardId}`, {
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

    // getUserInfo() {
    //     return this._request(`${this._baseUrl}/users/me`, {
    //         headers: this._headers
    //     })
    // }

    // updateUserInfo(userInfo) {
    //     return this._request(`${this._baseUrl}/users/me`, {
    //         headers: this._headers,
    //         method: 'PATCH',
    //         body: JSON.stringify(userInfo)
    //     })
    // }

    // updateAvatar(url) {
    //     return this._request(`${this._baseUrl}/users/me/avatar`, {
    //         headers: this._headers,
    //         method: 'PATCH',
    //         body: JSON.stringify(url)
    //     })
    // }

    // getInitialCards() {
    //     return this._request(`${this._baseUrl}/cards`, {
    //         headers: this._headers
    //     })
    // }

    // addCard(card) {
    //     return this._request(`${this._baseUrl}/cards`, {
    //         headers: this._headers,
    //         method: 'POST',
    //         body: JSON.stringify(card)
    //     })
    // }

    // removeCard(cardId) {
    //     return this._request(`${this._baseUrl}/cards/${cardId}`, {
    //         headers: this._headers,
    //         method: 'DELETE'
    //     })
    // }

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

    //   export const login = (password, email) => {
    //     return _request(`${BASE_URL}/signin`, {
    //       headers: {
    //         "Accept": "application/json",
    //         ...headers
    //       },
    //       method: 'POST',
    //       body: JSON.stringify({ password, email })
    //     });
    //   };

    //   export const validateToken = (jwt) => {
    //     return _request(`${BASE_URL}/users/me`, {
    //       headers: {
    //         "Authorization": `Bearer ${jwt}`,
    //         ...headers
    //       },
    //       method: 'GET'
    //     });
    //   };
}

export const mainApi = new Api({
    baseUrl: mainApiBaseUrl,
    headers: {
        // authorization: personalToken,
        'Content-Type': 'application/json'
    }
}); 
