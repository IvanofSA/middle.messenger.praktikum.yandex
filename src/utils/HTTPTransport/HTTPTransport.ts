enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface IOptions {
  timeout?: number;
  data?: { [key: string]: string } | any;
  method?: METHODS;
  headers?: { [name: string]: string };
  withCredentials?: boolean;
}

function queryStringify(data): string {
  if (data === undefined || typeof data !== "object") {
    throw new Error("error data");
  }

  const str = "?";
  const params = [];
  for (const [key, value] of Object.entries(data)) {
    params.push(`${key}=${value}`);
  }

  return str + params.join("&");
}

export default class HTTPTransport {
  _host: string;
  constructor(props: string) {
    this._host = props;
  }

  get(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    const { data } = options;
    url = data ? queryStringify(data) : url;
    return this.request(
      `${this._host}${url}`,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  post(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${this._host}${url}`,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  put(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${this._host}${url}`,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  delete(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${this._host}${url}`,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request(
    url: string,
    options: IOptions,
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const { data, method = METHODS.GET, headers = {} } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.withCredentials = true;
      xhr.open(method, url);
      xhr.onload = function () {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.response));
          } catch (e) {
            resolve(xhr.response)
          }
        } else {
          reject(new Error(xhr.status.toString()));
        }
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
