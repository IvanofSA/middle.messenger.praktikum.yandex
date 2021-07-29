interface Options {
  timeout?: number;
  data?: any;
  headers?: { [name: string]: string };
}

type RequestPromise = Promise<XMLHttpRequest>;

export class HTTPTransport {
  static METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
  };

  get = (url: string, options: Options = {}) =>
    this.request(url, HTTPTransport.METHODS.GET, options);

  put = (url: string, options: Options = {}) =>
    this.request(url, HTTPTransport.METHODS.PUT, options);

  post = (url: string, options: Options = {}) =>
    this.request(url, HTTPTransport.METHODS.POST, options);

  delete = (url: string, options: Options = {}) =>
    this.request(url, HTTPTransport.METHODS.DELETE, options);

  queryStringify(data: { [key: string]: any }) {
    const str = "?";
    const params = [];

    for (const [key, value] of Object.entries(data)) {
      params.push(`${key}=${value}`);
    }

    return str + params.join("&");
  }

  request = (
    url: string,
    method: string,
    options: Options,
    timeout: number = 5000
  ): RequestPromise =>
    new Promise((resolve, reject) => {
      const { data, headers } = options;
      if (method === HTTPTransport.METHODS.GET) {
        const queryString = this.queryStringify(data);
        url += queryString;
      }

      const xhr = new XMLHttpRequest();
      if (headers) {
        for (const [name, value] of Object.entries(headers)) {
          xhr.setRequestHeader(name, value);
        }
      }

      xhr.timeout = timeout;

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (!data || method === HTTPTransport.METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
}
