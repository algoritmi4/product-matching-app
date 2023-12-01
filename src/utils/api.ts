import { API_URL, HEADER, HEADER_AUTH } from './constants';

class Api {
  private _headers: HeadersInit;
  private _url: RequestInfo;

  constructor(baseURL: string, headers: HeadersInit) {
    (this._headers = headers), (this._url = baseURL);
  }

  _getResponseData(res: Response) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  addProducts(formData: BodyInit) {
    return fetch(`${this._url}/api/v1/products/import-csv/`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  addDealerPrices(formData: BodyInit) {
    return fetch(`${this._url}/api/v1/dealers/import-csv/dealerprices`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  addDealers(formData: BodyInit) {
    return fetch(`${this._url}/api/v1/dealers/import-csv/dealers`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  getDealerProducts(pageSize: number, offset: number) {
    return fetch(`${this._url}/api/v1/dealers/price?limit=${pageSize}&offset=${offset}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  getMatchedProducts() {
    return fetch(`${this._url}/api/v1/matching/all`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  getDealerPrice(id: string) {
    return fetch(`${this._url}/api/v1/dealers/price/${id}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  getDealers() {
    return fetch(`${this._url}/api/v1/dealers?limit=100&offset=0`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  getMatchList(id: string, count: string) {
    return fetch(`${this._url}/api/v1/matching/{dealerprice_id}/${id}/?count=${count}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then((res) => this._getResponseData(res));
  }

  postMatchingAccepted(id: string, productId: string) {
    return fetch(`${this._url}/api/v1/matching/accepted`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id,
        product_id: productId
      })
    }).then((res) => this._getResponseData(res));
  }

  postMatchingNotAccepted(id: string) {
    return fetch(`${this._url}/api/v1/matching/not-accepted`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id
      })
    }).then((res) => this._getResponseData(res));
  }

  postMatchingAcceptedLater(id: string) {
    return fetch(`${this._url}/api/v1/matching/accepted-later`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id
      })
    }).then((res) => this._getResponseData(res));
  }

  async _getResponseDataAuth(res: Response) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(await res.json());
  }

  _encode(parm: string): string {
    return encodeURIComponent(parm);
  }

  login(password: string, email: string) {
    return fetch(`${this._url}/auth/jwt/login`, {
      method: 'POST',
      headers: HEADER_AUTH,
      credentials: 'include',
      body: `grant_type=&username=${this._encode(email)}&password=${this._encode(
        password
      )}&scope=&client_id=&client_secret=`
    }).then(() => Promise.resolve());
  }

  logout() {
    return fetch(`${this._url}/auth/jwt/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include'
    });
  }

  register(username: string, email: string, password: string) {
    return fetch(`${this._url}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        is_active: true,
        is_superuser: false,
        is_verified: false,
        username,
        email,
        password
      })
    }).then((res) => this._getResponseDataAuth(res));
  }
}

const api = new Api(API_URL, HEADER);

export default api;
