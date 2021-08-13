import HTTPTransport from "../utils/HTTP";

const host = "https://ya-praktikum.tech/api/v2/chats";

const chatsApi = new HTTPTransport(host);

type createChat = {
  title: string;
};

export default class ChatsApi {
  getChats() {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return chatsApi.get("/", options);
  }

  createChat(formData: createChat) {
    const options = {
      data: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return chatsApi.post("/", options);
  }

  getChatUsers(id: number) {
    return chatsApi.get(`/${id}/users`);
  }

  getChatUsersToken(id: number) {
    return chatsApi.post(`/token/${id}`);
  }

  addUsersChat(userId: number, chatId: number) {
    const options = {
      data: JSON.stringify({ users: [userId], chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return chatsApi.put(`/users`, options);
  }

  deleteUsersChat(userId: number, chatId: number) {
    const options = {
      data: JSON.stringify({ users: [userId], chatId }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return chatsApi.delete(`/users`, options);
  }
}
