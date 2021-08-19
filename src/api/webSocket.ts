export default class WebSocketMessage {
  private socket: WebSocket;
  callBack: (() => []) | undefined;

  constructor(
    userId?: string,
    chatId?: number,
    chatToken?: string,
    callBack?: () => []
  ) {
    if (userId && chatId && chatToken) {
      this.socket?.close();
      this.socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`
      );
      this._registerEvents();
    }

    this.callBack = callBack;
  }

  private _registerEvents(): void {
    this.socket.addEventListener("open", this.open.bind(this));
    this.socket.addEventListener("message", this.message.bind(this));
    this.socket.addEventListener("error", this.error.bind(this));
    this.socket.addEventListener("close", this.close.bind(this));
  }

  open() {
    this.socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      })
    );
  }

  send(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }

  message(event: Record<string, string>) {
    const data = JSON.parse(event.data);
    return this.callBack(data);
  }

  error(event: Record<string, string>) {
    console.log("Ошибка", event.message);
  }

  close(event: Record<string, string>) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }
}
