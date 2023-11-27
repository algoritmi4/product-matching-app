class Api {
  constructor(config) {
    (this._headers = config.headers), (this._url = config.baseUrl);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  CSVFileLoad(formData) {
    return fetch(`${this._url}/`, {
      method: 'POST',
      headers: this._headers,
      body: formData
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseURL: 'http://localhost:3001',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export default api;
