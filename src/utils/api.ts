class Api {
  private _headers: HeadersInit;
  private _url: string;

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

  getDealerProducts() {
    return fetch(`${this._url}/dealers/price`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api('http://localhost:8000/api/v1', {
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export default api;
