import BaseAPI from "./baseApi";
import convertFormData from "../utils/convertFormdata";

class AuthApi extends BaseAPI {
  signUp(formData: Record<string, any>): Promise<object> {
    const options = {
      data: JSON.stringify(convertFormData(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post("/signup", options);
  }

  signIn(formData: Record<string, any>): Promise<object> {
    const options = {
      data: JSON.stringify(convertFormData(formData)),
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
