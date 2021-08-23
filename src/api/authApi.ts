import BaseAPI from "./baseApi";

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

class AuthApi extends BaseAPI {
  signUp(formData: SignUpRequest): Promise<object> {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post("/signup", options);
  }

  signIn(formData: SignInRequest): Promise<object> {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post("/signin", options);
  }

  getUserInfo(): Promise<object> {
    return this.http.get("/user");
  }

  logOut(): Promise<object> {
    return this.http.post("/logout");
  }
}

export const authAPI = new AuthApi("/auth");
