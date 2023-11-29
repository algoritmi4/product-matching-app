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

  getDealerProducts(pageSize: number, pageNumber: number) {
    return fetch(`${this._url}/dealers/price?size=${pageSize}&page=${pageNumber}`, {
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
    return fetch(`${this._url}/dealers?page=1&size=100`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api(API_URL, {
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default api;
