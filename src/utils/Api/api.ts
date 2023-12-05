import { API_URL, HEADER } from '../constants';

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
    }).then(this._getResponseData);
  }

  addDealerPrices(formData: BodyInit) {
    return fetch(`${this._url}/api/v1/dealers/import-csv/dealerprices`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  addDealers(formData: BodyInit) {
    return fetch(`${this._url}/api/v1/dealers/import-csv/dealers`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getDealerProducts(pageSize: number, offset: number) {
    return fetch(`${this._url}/api/v1/dealers/price?limit=${pageSize}&offset=${offset}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getMatchedUserProducts(status: string, offset: number) {
    return fetch(
      `${this._url}/api/v1/matching/user/me/?limit=20&status=${status}&offset=${offset}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._getResponseData);
  }

  getMatchedDealerProducts(dealerId: string, status: string, offset: number) {
    return fetch(
      `${this._url}/api/v1/matching/dealer/${dealerId}?limit=20&status=${status}&offset=${offset}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._getResponseData);
  }

  getUserMatchedCount(endDate: string, startDate?: string) {
    return fetch(
      `${this._url}/api/v1/analytics/matched-count/user/me?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._getResponseData);
  }

  getUserMatchedCountById({
    id,
    endDate,
    startDate
  }: {
    id: string;
    endDate: string;
    startDate: string;
  }) {
    return fetch(
      `${this._url}/api/v1/analytics/matched-count/user/${id}?${
        startDate ? `start_date=${startDate}&` : ''
      }end_date=${endDate}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._getResponseData);
  }

  getDealerMatchedCount({
    dealerId,
    endDate,
    startDate
  }: {
    dealerId: string;
    endDate: string;
    startDate: string;
  }) {
    return fetch(
      `${this._url}/api/v1/analytics/matched-count/dealer/${dealerId}?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._getResponseData);
  }

  getMatchedProducts() {
    return fetch(`${this._url}/api/v1/matching/all`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getDealerPrice(id: string) {
    return fetch(`${this._url}/api/v1/dealers/price/${id}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getDealers() {
    return fetch(`${this._url}/api/v1/dealers?limit=100&offset=0`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getMatchList(id: string, count: string) {
    return fetch(`${this._url}/api/v1/matching/{dealerprice_id}/?count=${count}&product_id=${id}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }

  postMatchingAccepted(id: string, productId: string) {
    return fetch(`${this._url}/api/v1/matching/accepted`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id,
        product_id: productId
      }),
      credentials: 'include'
    }).then(this._getResponseData);
  }

  postMatchingNotAccepted(id: string) {
    return fetch(`${this._url}/api/v1/matching/not-accepted`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id
      }),
      credentials: 'include'
    }).then(this._getResponseData);
  }

  postMatchingAcceptedLater(id: string) {
    return fetch(`${this._url}/api/v1/matching/accepted-later`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id
      }),
      credentials: 'include'
    }).then(this._getResponseData);
  }

  getCurrentUser() {
    return fetch(`${this._url}/api/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._getResponseData);
  }
}

const api = new Api(API_URL, HEADER);

export default api;
