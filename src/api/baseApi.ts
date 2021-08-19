import HTTPTransport from "../utils/HTTPTransport/HTTPTransport";

export default class BaseAPI {
  http: HTTPTransport;
  constructor(path: string) {
    this.http = new HTTPTransport(`https://ya-praktikum.tech/api/v2${path}`);
  }
}
