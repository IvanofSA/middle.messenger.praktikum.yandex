import HTTPTransport from "../utils/HTTP";

const host = "https://ya-praktikum.tech/api/v2/user";

const usersApi = new HTTPTransport(host);

export default class UsersApi {
  searchUser(login: string) {
    const options = {
      data: JSON.stringify({ login }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return usersApi.post("/search", options);
  }
}
