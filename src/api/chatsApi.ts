import BaseAPI from "./baseApi";
import convertFormData from "../utils/convertFormdata";

class ChatsApi extends BaseAPI {
  getChats(): Promise<object> {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.get("/", options);
  }

  createChat(formData: Record<string, any>): Promise<object> {
    const options = {
      data: JSON.stringify(convertFormData(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post("/", options);
  }

  getChatUsers(id: number): Promise<object> {
    return this.http.get(`/${id}/users`);
  }

  getChatUsersToken(id: number): Promise<object> {
    return this.http.post(`/token/${id}`);
  }

  addUsersChat(userId: number, chatId: number): Promise<object> {
    const options = {
      data: JSON.stringify({ usersIds: [userId], chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.put(`/users`, options);
  }

  deleteUsersChat(userId: number | string, chatId: number): Promise<object> {
    const options = {
      data: JSON.stringify({ usersIds: [userId], chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.delete(`/users`, options);
  }
}
export const chatsAPI = new ChatsApi("/chats");
