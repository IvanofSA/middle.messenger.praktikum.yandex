import BaseAPI from "./baseApi";

type userRequest = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

type changePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

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

  changeUserPassword(formData: changePasswordRequest): Promise<object> {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.put("/password", options);
  }

  changeUserProfile(formData: userRequest): Promise<object> {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.put("/profile", options);
  }
}

export const usersAPI = new UsersApi("/user");
