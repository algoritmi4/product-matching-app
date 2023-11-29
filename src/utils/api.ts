import { API_URL } from './constants';

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

  CSVFileLoad(formData: BodyInit) {
    return fetch(`${this._url}/dealers/import-csv/dealerprices`, {
      method: 'POST',
      body: formData
    }).then((res) => this._getResponseData(res));
  }

  getDealerProducts(pageSize: number, offset: number) {
    return fetch(`${this._url}/dealers/price?limit=${pageSize}&offset=${offset}`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  getDealerPrice(id: string) {
    return fetch(`${this._url}/dealers/price/${id}`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  getDealers() {
    return fetch(`${this._url}/dealers?limit=100&offset=0`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  getMatchList(id: string, count: string) {
    return fetch(`${this._url}/matching/${id}/?count=${count}`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  postMatching(id: string, productId: string) {
    return fetch(`${this._url}/matching`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        key: id,
        product_id: productId
      })
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api(API_URL, {
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default api;
