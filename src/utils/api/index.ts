interface ApiData {
  url: string;
  headers: Record<string, string>;
}

class Api {
  private _url: string;
  private _headers: Record<string, string>;

  constructor(data: ApiData) {
    this._url = data.url;
    this._headers = data.headers;
  }

  private _checkedError(res: Response): Promise<any> {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(errorData => {
      const error = new Error(errorData.message);
      return Promise.reject(error);
    });
  }

  private _getQueryParams(): string {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.toString();
  }

  getMovies(page: number, limit: number): Promise<any> {
    const queryParams = this._getQueryParams();
    return fetch(`${this._url}/v1.4/movie?page=${page}&limit=${limit}${queryParams ? '&' + queryParams : ''}`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._checkedError(res));
  }
  searchMoviesByName(name: string, page: number, limit: number): Promise<any> {
    return fetch(
      `${this._url}/v1.4/movie/search?page=${page}&limit=${limit}&query=${name}&sortField=votes.kp`,
      {
        method: 'GET',
        headers: this._headers
      }
    ).then(res => this._checkedError(res));
  }
  searchMovieById(id: number): Promise<any> {
    return fetch(
      `${this._url}/v1.4/movie/${id}`,
      {
        method: 'GET',
        headers: this._headers
      }
    ).then(res => this._checkedError(res));
  }
  searchReviewByIdMovie(id: number, page: number, limit: number): Promise<any> {
    return fetch(
      `${this._url}/v1.4/review?page=${page}&limit=${limit}&selectFields=&movieId=${id}`,
      {
        method: 'GET',
        headers: this._headers
      }
    ).then(res => this._checkedError(res));
  }
  searchPostersByIdMovie(id: Number, page: number, limit: number): Promise<any> {
    return fetch(
      `${this._url}/v1.4/image?page=${page}&limit=${limit}&movieId=${id}`,
      {
        method: 'GET',
        headers: this._headers
      }
    ).then(res => this._checkedError(res));
  }
  searchSeriesByIdMovie(id: Number, page: number, limit: number): Promise<any> {
    return fetch(
      `${this._url}/v1.4/season?page=${page}&limit=${limit}&movieId=${id}`,
      {
        method: 'GET',
        headers: this._headers
      }
    ).then(res => this._checkedError(res));
  }
}
const { REACT_APP_API_TOKEN } = process.env;

export const apiKP = new Api({
  url: 'https://api.kinopoisk.dev',
  headers: {
    'X-API-KEY': REACT_APP_API_TOKEN || ''
  }
});
