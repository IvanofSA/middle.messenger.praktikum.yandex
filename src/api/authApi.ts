import HTTPTransport from "../utils/HTTP";

const host = "https://ya-praktikum.tech/api/v2/auth";

const authApi = new HTTPTransport(host);

type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type SignInRequest = {
  login: string;
  password: string;
};

export default class AuthApi {
  signUp(formData: SignUpRequest) {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return authApi.post("/signup", options);
  }

  signIn(formData: SignInRequest) {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return authApi.post("/signin", options);
  }

  getUserInfo() {
    return authApi.get("/user");
  }

  logOut() {
    return authApi.post("/logout");
  }
}
