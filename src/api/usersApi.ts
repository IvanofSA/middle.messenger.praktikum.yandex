import BaseAPI from "./baseApi";
import convertFormData from "../utils/convertFormdata";

class UsersApi extends BaseAPI {
  searchUser(login: string): Promise<object> {
    const options = {
      data: JSON.stringify({ login }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post("/search", options);
  }

  changeUserPassword(formData: Record<string, any>): Promise<object> {
    const options = {
      data: JSON.stringify(convertFormData(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.put("/password", options);
  }

  changeUserProfile(formData: Record<string, any>): Promise<object> {
    const options = {
      data: JSON.stringify(convertFormData(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.put("/profile", options);
  }
}

export const usersAPI = new UsersApi("/user");
