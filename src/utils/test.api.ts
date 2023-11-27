import { API_URL } from './constants';

export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

class MarkingApi {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint: RequestInfo, options: RequestInit) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(checkResponse);
  }

  _getHeaders() {
    return {
      headers: `{'Content-Type': 'application/json'}`
    };
  }

  getDealers() {
    return this._request('/dealers?page=1&size=100', { headers: this._getHeaders() });
  }

  getBaseUrl() {
    return this._baseUrl;
  }
}

export const apiMarking = new MarkingApi(API_URL);
